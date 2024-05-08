
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});



function Upload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState(false)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null);
        }

    }
    console.log(selectedFile)
    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile, selectedFile.name);
            setDisabled(true)
            const requestOptions: RequestInit = {
                method: "POST",
                body: formData
            };

            fetch("http://localhost:8000/upload", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setDisabled(false)
                    console.log(result)
                })
                .catch((error) => console.error(error));
        } else {
            console.error("No file selected");
        }
    };
    return (
        <div className="">
            {selectedFile &&
                <Card variant='outlined'>
                    <CardContent>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {selectedFile.name}
                        </Typography>
                        <Button onClick={handleFileUpload} disabled={disabled} variant='contained'>Submit</Button>
                    </CardContent>
                </Card>
            }
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleChange} accept="video/mp4" disabled={disabled} />
            </Button>

        </div>

    )
}

export default Upload