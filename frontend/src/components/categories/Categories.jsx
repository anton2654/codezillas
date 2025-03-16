import "./categories.css";

function Categories({ categories, activeCategory, onCategoryClick }) {
  return (
    <>
      <div className="tabs">
        {categories.map((categor) => (
          <button
            key={categor}
            onClick={() => onCategoryClick(categor)}
            className={categor === activeCategory ? "tab active" : "tab"}
          >
            {categor}
          </button>
        ))}
      </div>
    </>
  );
}

export default Categories;
