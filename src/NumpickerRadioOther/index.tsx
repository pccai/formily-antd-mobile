import React, { useState, useRef } from 'react';
import { ISchemaFieldComponentProps } from '@formily/react-schema-renderer';
import { RadioGroup } from '../components/radio';
import { getComponentProps, getDisabled, getEnum } from '../util';
import { Input as InputItem, Picker } from 'antd-mobile';
import { range } from 'lodash';
import PickerItem from '../PickerItem';
import './style.less';

export const NumpickerRadioOther = (props: ISchemaFieldComponentProps) => {

  const newProps = {
    ...getComponentProps(props),
    disabled: getDisabled(props),
    value: props.value?.value || undefined,
    options: getEnum(props),
  };

  const [otherText, setOtherText] = useState<string | undefined>(props.value?.otherText);
  const [inputAble, setInputAble] = useState<boolean>(props.value?.value === '其他');
  const [num, setNum] = useState<string | undefined>(props.value?.num);
  const inputRef = useRef<{
    focus: () => void
  }>();

  newProps.onChange = (e) => {
    const value = e.target.value;
    if (value !== '其他') {
      setOtherText(undefined);
      setInputAble(false);
    } else {
      setInputAble(true);
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
    setNum(undefined);
    props.mutators.change({
      value,
      otherText
    });
  };

  const onInputChange = (value: string) => {
    setOtherText(value);
    props.mutators.change({
      value: props.value.value,
      otherText: value,
    });
  }

  const onPickerChange = (value: any) => {
    setOtherText('');
    setInputAble(false);
    setNum(value?.[0]);
    props.mutators.change({
      num: value?.[0],
      value: undefined,
      otherText: undefined,
    });
  }

  const onClear = e => {
    e.stopPropagation();
    setNum(undefined);
    props.mutators.change({
      num: undefined,
    });
  };

  return (
    <div className="">
      <RadioGroup {...newProps}></RadioGroup>
      <InputItem
        className={`checkboxOtherInput ${inputAble ? 'active' : ''}`}
        disabled={!inputAble}
        value={otherText}
        onChange={onInputChange}
        ref={(ref: any) => inputRef.current = ref}
      />
    </div>

  )
}

export default NumpickerRadioOther;