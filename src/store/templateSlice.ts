import { TemplateData, TemplateDataMap, TemplateState, TemplateType } from '@/utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TemplateState = {
    mode: null,
    templateData: null,
};

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<TemplateState['mode']>) => {
            state.mode = action.payload;
        },
        setTemplateData: (state, action: PayloadAction<{ type: Exclude<TemplateType, null>; data: TemplateDataMap[Exclude<TemplateType, null>] }>) => {
            const { type, data } = action.payload;

            state.templateData = { type, data } as TemplateData;
        },
        resetTemplate: () => {
            return initialState;
        },
    },
});

export const { setMode, setTemplateData, resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;

// Selectors
export const selectTemplateMode = (state: { template: TemplateState }) => state.template.mode;
export const selectTemplateData = (state: { template: TemplateState }) => state.template.templateData;