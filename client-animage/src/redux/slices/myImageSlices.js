import { createSlice } from "@reduxjs/toolkit";
import { animageApi } from "../../helpers/http-client";

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        list: [],
    },
    reducers: {
        setImagesData: (state, action) => {
            state.list = action.payload;
        }
    }
});

export const { setImagesData } = imageSlice.actions;

export const fetchMyImages = () => async (dispatch) => {
    try {
      const { data } = await animageApi.get('/api/my-images', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(setImagesData(data));
    } catch (err) {
      console.error(err);
      dispatch(setError(err?.response?.data?.message));
    }
};

export default imageSlice.reducer;