import { useState } from 'react';

export default function Body() {

    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat(event.target.value);
    };


    return (
        <>
            <div className='checkboxContainer'>
                <label htmlFor="JSON">JSON</label>
                <input
                    className='radioJSON'
                    type="radio"
                    name="format"
                    id="JSON"
                    value="JSON"
                    checked={selectedFormat === 'JSON'}
                    onChange={handleRadioChange}
                />
                <label htmlFor="XML">XML</label>
                <input
                    className='radioXML'
                    type="radio"
                    name="format"
                    id="XML"
                    value="XML"
                    checked={selectedFormat === 'XML'}
                    onChange={handleRadioChange}
                />
            </div>
            <div className='bodyContainer'>
                <input type="text" name="Body" id="Body" className="bodyContainerInput" />
            </div>
        </>
    );
}




