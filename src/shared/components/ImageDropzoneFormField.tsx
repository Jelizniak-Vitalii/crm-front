import React from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
import { FieldRenderProps } from 'react-final-form';
import { FormControl, FormHelperText, Box, Avatar } from '@mui/material';
import ImageCompressor from 'image-compressor.js';
import { makeStyles } from 'tss-react/mui';

interface ImageDropzoneFieldProps extends FieldRenderProps<string, HTMLElement> {
  labelText?: string;
}

const useStyles = makeStyles()(() => ({
  avatar: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    width: '100%',
    height: '100%'
  },
  inputWrapper: {
    border: '1px dashed black',
    padding: '5px',
    cursor: 'pointer',
    width: '100px',
    height: '100px',
    borderRadius: '50%'
  }
}));

const ImageDropzoneField: React.FC<ImageDropzoneFieldProps> = ({ input: { onChange }, meta: { touched, error } }) => {
  const { classes } = useStyles();

  const onDrop = React.useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles?.[0];

      if (fileRejections.length > 0 || !acceptedFiles[0]) {
        console.error('Error uploading files:', fileRejections);
        return;
      }

      try {
        const compressedFile = await new ImageCompressor(file, {
          quality: 0.2, // Устанавливаем качество сжатия (от 0 до 1)
          maxWidth: 600, // Устанавливаем максимальную ширину изображения
          maxHeight: 600, // Устанавливаем максимальную высоту изображения
          convertSize: 300000, // Устанавливаем максимальный размер файла (300 кБ)
          mimeType: 'image/jpeg', // Устанавливаем желаемый MIME-тип для сжатого изображения
        }).compress(file); // Передаем файл для сжатия

        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (result) onChange(result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    },
    [onChange],
  );

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/heic': [],
      'image/jfif': [],
    },
    onDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <Box mt={2}>
      <FormControl fullWidth error={touched && !!error}>
        <div {...getRootProps()} className={classes.inputWrapper}>
          <input {...getInputProps()} />
          <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
        </div>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default ImageDropzoneField;
