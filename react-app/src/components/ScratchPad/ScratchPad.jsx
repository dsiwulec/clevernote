import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../store/note';
import { getAllNotebooks } from '../../store/notebook';
import { getAllNotes } from '../../store/note';
import 'quill/dist/quill.bubble.css';
import './ScratchPad.css'

const ScratchPad = () => {
    const [text, setText] = useState("")

    const theme = 'bubble';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const placeholder = 'Start writing...';

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent', 'header',
        'link', 'color', 'background', 'clean'
    ];

    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const scratch = useSelector(state => Object.values(state.notes.all).filter(note => note.scratch === true).at(0))

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateNote({ id: scratch.id, notebookId: scratch.notebookId, title: "", text }));
        if (data) {
            let errors = []
            let errorsProperties = Object.values(data)
            let errorsKeys = Object.keys(data)
            for (let i = 0; i < errorsKeys.length; i++) {
                errors.push(errorsKeys[i] + ': ' + errorsProperties[i])
            }
            setErrors(errors);
        }
    };

    useEffect(() => {
        (async function () {
            await dispatch(getAllNotebooks());
            await dispatch(getAllNotes())
        })()
    }, [dispatch])

    useEffect(() => {
        (async function () {
            if (scratch) {
                quill?.setText(scratch.text)
            }
        })()
    }, [dispatch, quill, scratch])

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                // console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                setText(quill.getText())
            });
        }
    }, [quill]);


    return (
        <form id='scratch-pad' onSubmit={onSubmit}>
            <div id='scratch-header'>
                SCRATCH PAD
                <button id='scratch-save' type="submit">Save</button>
            </div>
            <div id='scratch-body' ref={quillRef} />
            {errors.length > 0 && (
                <div id='login-errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>)}
        </form>
    );
};

export default ScratchPad;
