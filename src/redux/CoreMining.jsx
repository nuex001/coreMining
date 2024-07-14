import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initializing state
const initialState = {
  loading: false,
  user: null,
  tasks: [],
  refs: [],
  error: null,
  success: null,
};

// Generates async functions
// https://backend.propertiesyard.com

// LOGIN
export const logorsign = createAsyncThunk(
  "CoreMining/logorsign",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/`,
        form
      );
      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("myId", response.data.myId);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.err);
    }
  }
);

// Get User
export const getUser = createAsyncThunk(
  "CoreMining/getUser",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/`);
      return response.data; // data is the last
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE Points
export const updatePoints = createAsyncThunk(
  "CoreMining/updatepoints",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/`, form);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH TASKS
export const fetchRefs = createAsyncThunk(
  "CoreMining/fetchRefs",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/referred/"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "CoreMining/fetchTasks",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/task/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CLAIM TASK
export const claimTask = createAsyncThunk(
  "CoreMining/claimTask",
  async ({ taskId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/${taskId}`,
        {
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CREATE TASK
export const createTask = createAsyncThunk(
  "CoreMining/createTask",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// EQUIP TOOLS
export const equipTools = createAsyncThunk(
  "CoreMining/equipTools",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/tools`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// EQUIP TOOLS
export const rechargLevel = createAsyncThunk(
  "CoreMining/rechargLevel",
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/recharge`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// REDUCERS
const CoreMiningSlice = createSlice({
  name: "CoreMining",
  initialState,
  reducers: {
    clear(state) {
      return {
        ...state,
        success: null,
        error: null,
      };
    },
  },
  // working for async fetching data
  extraReducers: (builder) => {
    // WORKING FOR Register -> LOGIN
    builder.addCase(logorsign.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logorsign.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(logorsign.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // WORKING FOR GET User
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });

    // WORKING FOR GET REFERRALS
    builder.addCase(fetchRefs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRefs.fulfilled, (state, action) => {
      state.loading = false;
      state.refs = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRefs.rejected, (state, action) => {
      state.loading = false;
      state.refs = null;
      state.error = action.payload;
    });
    // FETCH TASK
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // CLAIM TASK
    builder.addCase(claimTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(claimTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(claimTask.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // CREATE TASK
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // EQUIP TOOLS
    builder.addCase(equipTools.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(equipTools.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(equipTools.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });

    // RECHARGE LEVEL
    builder.addCase(rechargLevel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rechargLevel.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      state.error = null;
    });
    builder.addCase(rechargLevel.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    });
  },
});
export const { clear } = CoreMiningSlice.actions;
export default CoreMiningSlice.reducer;