import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Modal } from 'antd';
import React, { useState } from 'react';

type RequiredMark = boolean | 'optional';

const AntdForm: React.FC = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
  const [dialogVisble, setDialogVisible] = useState(false);

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (<>
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Required Mark" name="requiredMarkValue">
        <Radio.Group>
          <Radio.Button value="optional">Optional</Radio.Button>
          <Radio.Button value>Required</Radio.Button>
          <Radio.Button value={false}>Hidden</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Field A" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Field B"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
    <Button onClick={() => setDialogVisible(true)}>open modal</Button>
    <p>I got my Bachelors and Masters in Computer Science. I took at least 4 courses directly related to data structures and algorithms (one of them about computational geometry! which was very cool). Despite all that I’ve never been one for “formal definitions” and lots of math.</p>

    <p>So, fair warning: If you want precise definitions and mathematical proofs, this is not the article for you :) I’m going to try to avoid that stuff as hard as I can, and write for maximum understanding, instead.</p>
    <Modal
      title="modal"
      open={dialogVisble}
      onCancel={() => setDialogVisible(false)}
      onOk={() => setDialogVisible(false)}
    >
      <div>modal</div>
    </Modal>
  </>);
};

export default AntdForm;
