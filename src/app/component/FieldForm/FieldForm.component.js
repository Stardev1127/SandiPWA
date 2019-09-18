import { PureComponent } from 'react';

import Form from 'Component/Form';
import Field from 'Component/Field';

import './FieldForm.style';

class FieldForm extends PureComponent {
    onFormSuccess() {
        // TODO: implement
    }

    get fieldMap() {
        return {
            // email: {
            //     label: __('Email'),
            //     validation: ['notEmpty']
            // }
        };
    }

    getDefaultValues([key, props]) {
        const {
            type = 'text',
            onChange = () => {},
            ...otherProps
        } = props;

        return {
            ...otherProps,
            key,
            name: key,
            id: key,
            type,
            onChange
        };
    }

    renderField = fieldEntry => (
        <Field { ...this.getDefaultValues(fieldEntry) } />
    );

    renderFields() {
        return (
            <div
              block="FieldForm"
              elem="Fields"
            >
                { Object.entries(this.fieldMap).map(this.renderField) }
            </div>
        );
    }

    renderActions() {
        return null;
    }

    render() {
        return (
            <Form
              onSubmitSuccess={ this.onFormSuccess }
              mix={ { block: 'FieldForm' } }
            >
                { this.renderFields() }
                { this.renderActions() }
            </Form>
        );
    }
}

export default FieldForm;
