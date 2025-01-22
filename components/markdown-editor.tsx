'use client';
import React, { useCallback, useState } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
    const handleChange = useCallback(
        (value: string) => {
            onChange(value);
        },
        [onChange],
    );

    return (
        <div className="markdown-editor prose mb-5 dark:prose-invert rtl:text-right">
            <SimpleMdeReact value={value} onChange={handleChange} />
        </div>
    );
};

export default MarkdownEditor;
