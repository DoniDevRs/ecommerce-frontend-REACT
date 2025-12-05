import { useContext, useEffect } from "react";

//Components
import CategoryItem from "../category-item/category-item.component";

//Styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";
import { CategoryContext } from "../../contexts/category.context";
import LoadingComponent from "../loading/loading.component";

const Categories = () => {
    const { categories, isLoading, fetchCategories } = useContext(CategoryContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContainer>
            {isLoading && <LoadingComponent />}

            <CategoriesContent>
                {categories.map((category) => 
               <div key={category.id}>
                 <CategoryItem category={category} />
               </div>
            )} 
            </CategoriesContent>

        </CategoriesContainer>
    )
}

export default Categories;