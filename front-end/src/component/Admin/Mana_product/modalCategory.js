import axios from "axios";
import { useEffect, useState } from "react"

export default function ModalCategory({ currentCategory, onSaveCategory }) {
    const [listCategory, setListCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: currentCategory?.id,
        nameCategory: currentCategory?.nameCategory,
        status: currentCategory?.status,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8081/api/category/admin/');

            const result = response.data.data;
            setListCategory(result);
        }

        fetchData()
    }, [currentCategory])

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;

        const selectedCategory = listCategory.find(category => category.id === parseInt(selectedId));

        setSelectedCategory({
            id: selectedCategory.id,
            nameCategory: selectedCategory.nameCategory,
            status: selectedCategory.status,
        });
    };

    // Xử lý khi người dùng nhấn "Lưu thay đổi"
    const handleSave = () => {
        console.log('save:',selectedCategory)
        onSaveCategory(selectedCategory); // Gọi hàm onSave từ props và truyền danh mục mới
    };

    return (
        <div className="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editCategoryModalLabel">Sửa Danh Mục</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="currentCategory" className="form-label">Danh mục hiện tại:</label>
                                <input type="text" className="form-control bg-secondary text-light" id="currentCategory"
                                    value={currentCategory?.nameCategory} readonly
                                /> 
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newCategory" className="form-label">Danh mục mới:</label>
                                <select
                                    className="form-select"
                                    id="newCategory"
                                    value={selectedCategory.id}
                                    onChange={(e) => handleCategoryChange(e)}
                                >
                                    {listCategory.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.nameCategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleSave(selectedCategory)}
                        >Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}