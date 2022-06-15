import React, { FC, useRef } from "react";
import styles from './LoadMyFile.module.css';
import { IItems } from '../types/types';

interface LoadMyFileProps {
    items: IItems[],
    onClickFileAdd: (fileList: Array<string>) => void, 
}

const LoadMyFile: FC<LoadMyFileProps> = ({ items, onClickFileAdd }) => {

    const fileInput = useRef<HTMLInputElement| null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        //let file = fileInput.current.files[0];
        let file = fileInput?.current?.files?.[0];

        let reader = new FileReader();
        reader.readAsText(file); // Аргумент типа "File | undefined" нельзя назначить параметру типа "Blob".
        reader.onload = function () {

            //let fileList = reader.result.split('\n');
            let fileList: Array<string> = reader.result.split('\n'); // Свойство "split" не существует в типе "string | ArrayBuffer".
            
            if (fileList.includes('\r')) {
                alert(`В вашем файле есть пустая строка. Отредактируйте файл`);
                return
            };

            let dublicate = items.find(item => fileList.includes(item.value));

            if (dublicate) {
                alert(`В вашем списке уже есть задача: ${dublicate.value} Удалите её из файла, а также все повторяющиеся задачи`)
                return
            }

            onClickFileAdd(fileList);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

        fileInput.current.value = ""; // Возможно, объект равен null.ts(2531)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.load_file}>
            <label>
                Загрузите файл .txt &nbsp;
                <input type='file' ref={fileInput} />
            </label>
            <button type="submit">Отправить</button>
        </form>
    );
}

export default LoadMyFile;