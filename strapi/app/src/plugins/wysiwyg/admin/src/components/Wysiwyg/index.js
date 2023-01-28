import React, { useState } from "react";
    import PropTypes from "prop-types";
    import { isEmpty } from "lodash";
    import TinyEditor from "../Tinymce";
    import { useIntl } from 'react-intl';
    import {
        Button,
        Stack,
        Flex,
        Field,
        FieldLabel,
        Typography
    } from '@strapi/design-system';
    import { FieldHint, FieldError } from '@strapi/design-system/Field';

    const Wysiwyg = ({
      description,
      disabled,
      error,
      intlLabel,
      labelAction,
      name,
      onChange,
      placeholder,
      value,
      required
    }) => {
      const [isOpen, setIsOpen] = useState(false);

      console.log(required);
      const { formatMessage } = useIntl();
      const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : '';
      const hint = description
        ? formatMessage(
            { id: description.id, defaultMessage: description.defaultMessage },
            { ...description.values }
          )
        : '';
      const label = formatMessage(intlLabel);
      const formattedPlaceholder = placeholder
        ? formatMessage(
            { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
            { ...placeholder.values }
          )
        : '';

      return (
        <div>
          <Field name={name} error={errorMessage} hint={hint}>
            <Stack spacing={1} padding={1}>
              <Flex>
                <FieldLabel>
                {label}
                {required &&
                  <Typography variant="pi" fontWeight="bold" textColor="danger600">*</Typography>
                }
          </FieldLabel>
              </Flex>
              <TinyEditor name={name} onChange={onChange} value={value} />
              <FieldHint />
              <FieldError />
            </Stack>
          </Field>
        </div>
      );
    };
    export default Wysiwyg;
