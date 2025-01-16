import { TemplateDataMap, TemplateState, TemplateType } from '@/utils/interfaces';
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
        },
        setTemplateData: (state, action: PayloadAction<{
            [K in Exclude<TemplateType, null>]: K extends keyof TemplateDataMap ? TemplateDataMap[K] : never;
        } | null>) => {
            state.templateData = action.payload;
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