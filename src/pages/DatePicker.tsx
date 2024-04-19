import React from 'react';
import { Space, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const AntdDatePicker: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
    <RangePicker
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')]
      }}
      onChange={
        (dates, dateStrings) => {
          console.log(dates, dateStrings);
        }
      }
    />
  </Space>
);

export default AntdDatePicker;
