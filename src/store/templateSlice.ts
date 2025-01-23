import { TemplateData, TemplateDataMap, TemplateState, TemplateType } from '@/utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TemplateState = {
    mode: null,
    selectedTemplate: null,
    templateData: null,
};

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<TemplateState['mode']>) => {
            state.mode = action.payload;
        },
        setSelectedTemplate: (state, action: PayloadAction<TemplateType>) => {
            state.selectedTemplate = action.payload;
            state.templateData = null;
        },
        setTemplateData: (state, action: PayloadAction<{ type: Exclude<TemplateType, null>; data: TemplateDataMap[Exclude<TemplateType, null>] }>) => {
            const { type, data } = action.payload;

            if (state.selectedTemplate === type) {
                state.templateData = { type, data } as TemplateData;
            } else {
                console.error(
                    `Template mismatch: Expected ${state.selectedTemplate}, received ${type}`
                );
            }
        },
        resetTemplate: (state) => {
            return initialState;
        },
    },
});

export const { setMode, setSelectedTemplate, setTemplateData, resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;

// Selectors
export const selectTemplateMode = (state: { template: TemplateState }) => state.template.mode;
export const selectSelectedTemplate = (state: { template: TemplateState }) => state.template.selectedTemplate;
export const selectTemplateData = (state: { template: TemplateState }) => state.template.templateData;