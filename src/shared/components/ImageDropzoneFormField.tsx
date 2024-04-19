import React from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
import { FieldRenderProps } from 'react-final-form';
import { FormControl, FormHelperText, InputLabel, Box } from '@mui/material';
import ImageCompressor from 'image-compressor.js';

interface ImageDropzoneFieldProps extends FieldRenderProps<string, HTMLElement> {
  labelText?: string;
}

const ImageDropzoneField: React.FC<ImageDropzoneFieldProps> = ({ input: { onChange }, meta: { touched, error }, labelText = '' }) => {
  const onDrop = React.useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        // Обработка ошибок загрузки файлов, если это необходимо
        console.error('Error uploading files:', fileRejections);
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      try {
        // Создаем экземпляр сжатия изображения
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
    accept: 'image/*',
    onDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <Box mt={2}>
      <FormControl fullWidth error={touched && !!error}>
        <InputLabel>{labelText}</InputLabel>
        <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px', cursor: 'pointer' }}>
          <input {...getInputProps()} />
          <p>Перетащите сюда изображение или кликните на область</p>
        </div>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default ImageDropzoneField;
