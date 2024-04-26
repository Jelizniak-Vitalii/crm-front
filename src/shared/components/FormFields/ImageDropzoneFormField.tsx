import React from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
import { FieldRenderProps } from 'react-final-form';
import { FormControl, FormHelperText, Box, Avatar } from '@mui/material';
import ImageCompressor from 'image-compressor.js';
import { makeStyles } from 'tss-react/mui';
import CameraIcon from '@mui/icons-material/PhotoCamera';

interface ImageDropzoneFieldProps extends FieldRenderProps<string, HTMLElement> {
  variant?: 'circular' | 'rounded' | 'square';
}

const useStyles = makeStyles<{ variant?: 'circular' | 'rounded' | 'square' }>()((_, { variant }) => ({
  avatarWrapper: {
    position: 'relative',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: `${variant === 'square' ? '0%' : '50%'}`,
    border: '1px dashed gray',
    padding: '5px',
    cursor: 'pointer',
    '&:hover::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 'inherit',
      zIndex: 1,
    },
    '&:hover .cameraIcon': {
      visibility: 'visible',
    },
  },
  cameraIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '24px',
    zIndex: 2,
    visibility: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
}));

const ImageDropzoneField = ({ input: { onChange, value }, meta: { touched, error }, variant }: ImageDropzoneFieldProps) => {
  const { classes } = useStyles({ variant });

  const onDrop = React.useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles?.[0];

      if (fileRejections.length > 0 || !acceptedFiles[0]) {
        console.error('Error uploading files:', fileRejections);
        return;
      }

      try {
        const compressedFile = await new ImageCompressor(file, {
          quality: 0.2,
          maxWidth: 600,
          maxHeight: 600,
          convertSize: 300000,
          mimeType: 'image/jpeg',
        }).compress(file);

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
        <div {...getRootProps()} className={classes.avatarWrapper}>
          <input {...getInputProps()} />
          <Avatar className={classes.avatar} src={value ?? ''} variant={variant} />
          <CameraIcon className={`${classes.cameraIcon} cameraIcon`} />
        </div>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default ImageDropzoneField;
