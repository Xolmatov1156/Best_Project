import React from "react";
import { Select } from "antd";

const CustomSelect = ({ setProductType, productType }) => {
    function handleChange(id, obj) {
        setProductType(id);
    }

    return (
        <Select
            value={productType}
            size="large"
            showSearch
            onChange={handleChange}
            allowClear
            className="custom-select mt-[30px]"
            style={{
                width: "100%",
            }}
            placeholder="Enter your product type"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
                {
                    value: "1",
                    label: "Fruits",
                },
                {
                    value: "2",
                    label: "Vegetables",
                },
                {
                    value: "3",
                    label: "Spices",
                },
            ]}
        />
    );
};

export default CustomSelect;
