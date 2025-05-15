import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ensureUserDoc,
  fetchUserData,
  addToWatchlist,
  removeFromWatchlist,
  addFavouriteMovie,
  removeFavouriteMovie,
  addFavouriteActor,
  removeFavouriteActor,
} from "../../api/userDataApi";

export const initUserLists = createAsyncThunk(
  "userLists/init",
  async (_, { getState }) => {
    const uid = getState().auth.user.uid;
    await ensureUserDoc(uid);
    return fetchUserData(uid);
  }
);

export const toggleWatchlist = createAsyncThunk(
  "userLists/toggleWatchlist",
  async ({ movieId }, { getState }) => {
    debugger;
    console.log("toggling ", movieId, "to watchlist");
    const uid = getState().auth.user.uid;
    const inList = getState().userLists.watchlist.includes(movieId);
    console.log("entering if else", inList);
    if (inList) {
      console.log("Removing...");
      await removeFromWatchlist(uid, movieId);
    } else {
      console.log("Adding...");
      await addToWatchlist(uid, movieId);
    }
    return { movieId };
  }
);

export const toggleFavouriteMovie = createAsyncThunk(
  "userLists/toggleFavouriteMovie",
  async ({ movieId }, { getState }) => {
    const uid = getState().auth.user.uid;
    const inList = getState().userLists.favourites.movies.includes(movieId);
    if (inList) await removeFavouriteMovie(uid, movieId);
    else await addFavouriteMovie(uid, movieId);
    return { movieId };
  }
);

export const toggleFavouriteActor = createAsyncThunk(
  "userLists/toggleFavouriteActor",
  async ({ actorId }, { getState }) => {
    const uid = getState().auth.user.uid;
    const inList = getState().userLists.favourites.actors.includes(actorId);
    if (inList) await removeFavouriteActor(uid, actorId);
    else await addFavouriteActor(uid, actorId);
    return { actorId };
  }
);

const initialState = {
  watchlist: [],
  favourites: { actors: [], movies: [] },
  loading: true,
};

const userListsSlice = createSlice({
  name: "userLists",
  initialState,
  reducers: {
    setLists(state, action) {
      state.watchlist = action.payload.watchlist;
      state.favourites = action.payload.favourites;
      state.loading = false;
    },
    clearLists(state) {
      state.watchlist = [];
      state.favourites = { actors: [], movies: [] };
      state.loading = false;
    },
    finishLoadingLists(state) {
      state.loading = false;
    },
    toggleWatchInState(state, action) {
      const { movieId } = action.payload;
      const idx = state.watchlist.indexOf(movieId);
      if (idx > -1) state.watchlist.splice(idx, 1);
      else state.watchlist.push(movieId);
    },
    toggleFavMovieInState(state, action) {
      const { movieId } = action.payload;
      const idx = state.favourites.movies.indexOf(movieId);
      if (idx > -1) state.favourites.movies.splice(idx, 1);
      else state.favourites.movies.push(movieId);
    },
    toggleFavActorInState(state, action) {
      const { actorId } = action.payload;
      const idx = state.favourites.actors.indexOf(actorId);
      if (idx > -1) state.favourites.actors.splice(idx, 1);
      else state.favourites.actors.push(actorId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUserLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(initUserLists.fulfilled, (state, { payload }) => {
        state.watchlist = payload.watchlist;
        state.favourites = payload.favourites;
        state.loading = false;
      })
      .addCase(initUserLists.rejected, (state) => {
        state.loading = false;
      })

      .addCase(toggleWatchlist.fulfilled, (state, { payload }) => {
        userListsSlice.caseReducers.toggleWatchInState(state, { payload });
      })
      .addCase(toggleFavouriteMovie.fulfilled, (state, { payload }) => {
        userListsSlice.caseReducers.toggleFavMovieInState(state, { payload });
      })
      .addCase(toggleFavouriteActor.fulfilled, (state, { payload }) => {
        userListsSlice.caseReducers.toggleFavActorInState(state, { payload });
      });
  },
});

export const {
  setLists,
  clearLists,
  finishLoadingLists,
  toggleWatchInState,
  toggleFavMovieInState,
  toggleFavActorInState,
} = userListsSlice.actions;

export default userListsSlice.reducer;
