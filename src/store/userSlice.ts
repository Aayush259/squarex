
import { UserState } from '@/utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user;
export const selectPortfolioSlug = (state: { user: UserState }) => state.user.id;
