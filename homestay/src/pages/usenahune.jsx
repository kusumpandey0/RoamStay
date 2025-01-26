const handleCategorySelection = (item) => {
  setCategoryAll(!CategoryAll);
  setCategoryLists((prevCategoryLists) => {
    let updatedCategories = [...prevCategoryLists];
    if (item.label === "All") {
      if (CategoryAll) {
        return [];
      } else {
        if (updatedCategories.length >= 0) {
          updatedCategories = categories.filter(
            (category) => category.label !== "All"
          );
          return updatedCategories;
        }
      }
    } else {
      setCategoryAll(false);
      if (prevCategoryLists.some((category) => category.label === item.label)) {
        updatedCategories = prevCategoryLists.filter(
          (category) => category.label !== item.label
        );
        return updatedCategories;
      } else {
        updatedCategories = [...prevCategoryLists, item];
        return updatedCategories;
      }
    }
  });
};
const handleSelection = (field, item) => {
  setCategoryAll(!CategoryAll);
  setFormData((prev) => {
    const list = prev[field]; // Access the current list for the field
    let updatedList = [...list];
    if (item.label === "All") {
      if (CategoryAll) {
        // If "All" is already selected, clear the list
        updatedList = [];
      } else {
        updatedList = list.filter((i) => i.name !== "All");
      }
    } else {
      setCategoryAll(false);
      const isSelected = list.some((i) => i.name === item.name);

      // If "All" is selected, deselect it
      updatedList = list.filter((i) => i.name !== "All");

      if (isSelected) {
        // Remove the item if it's already selected
        updatedList = updatedList.filter((i) => i.name !== item.name);
      } else {
        // Add the item if it's not selected
        updatedList = [...updatedList, item];
      }
    }

    return { ...prev, [field]: updatedList };
  });
};
