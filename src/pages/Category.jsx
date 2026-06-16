import { useState, useEffect } from 'react'
import '../styles/Category.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCategory, updateCat } from '../redux/actions/categoryAction'
import { userRequest } from '../requestMethods'

const Category = () => {
    const { catId } = useParams()
    const category = useSelector((state) => state.category.singleCategory)
    const [updateData, setUpdateData] = useState({})
    const [file, setFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const notify = () => toast.success('Category updated to database!')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory(catId))
    }, [catId, dispatch])

    const handleChange = (e) => {
        setUpdateData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            setIsUploading(true)
            let imageUrl = category?.image || ''

            if (file) {
                const formData = new FormData()
                formData.append('image', file)
                const response = await userRequest.post('/upload', formData)
                const data = response.data
                imageUrl = data.url || imageUrl
            }

            const payload = {
                ...updateData,
                image: imageUrl,
                _id: catId,
            }

            await dispatch(updateCat(payload))
            notify()
        } catch (error) {
            console.error(error)
            toast.error('Upload failed! Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className='category'>
            <div className='catContainer'>
                <div className='catLeft'>
                    <div className='imgDiv'>
                        <img src={category?.image} alt='' className='catUploadImg' />
                    </div>
                    <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} />
                    {isUploading && <p>Uploading image...</p>}
                </div>
                <div className='catRight'>
                    <label>Category Title</label>
                    <input
                        className='catTitle'
                        name='title'
                        type='text'
                        onChange={handleChange}
                        value={updateData.title ?? category?.title ?? ''}
                    />
                    <button className='catButton' onClick={handleClick} disabled={isUploading}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Category