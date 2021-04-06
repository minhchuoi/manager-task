import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const PullDown: React.FC = () => {
   return (
      <Select
         showSearch
         style={{ width: 200 }}
         placeholder="Select a person"
         optionFilterProp="children"
         // onChange={onChange}
         // onFocus={onFocus}
         // onBlur={onBlur}
         // onSearch={onSearch}
         filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
         <Option value="jack">Jack</Option>
         <Option value="lucy">Lucy</Option>
         <Option value="tom">Tom</Option>
      </Select>
   );
};

export default PullDown;
