
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface RecentlyViewedState {
  items: string[]; // Store product IDs
}

const loadRecentlyViewedFromLocalStorage = (): string[] => {
  try {
    const savedItems = localStorage.getItem('recentlyViewed');
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (e) {
    console.error('Failed to load recently viewed items from localStorage:', e);
  }
  return []; // Return empty array if no items are found or an error occurs
};

const saveRecentlyViewedToLocalStorage = (items: string[]) => {
  try {
    localStorage.setItem('recentlyViewed', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save recently viewed items to localStorage:', e);
  }
};

const initialState: RecentlyViewedState = {
  items: loadRecentlyViewedFromLocalStorage(),
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<string>) => {
      const existingIndex = state.items.indexOf(action.payload);
      if (existingIndex !== -1) {
        // Remove the existing product ID to re-add it at the beginning
        state.items.splice(existingIndex, 1);
      }
      // Add the product ID to the beginning of the array
      state.items.unshift(action.payload);

      // Optionally limit the array length to a maximum number (e.g., 10 items)
      if (state.items.length > 10) {
        state.items.pop();
      }

      // Save the updated items to localStorage
      saveRecentlyViewedToLocalStorage(state.items);
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
      // Clear localStorage
      localStorage.removeItem('recentlyViewed');
    },
  },
});

// Selector to get all recently viewed items
export const selectRecentlyViewedItems = (state: RootState) => state.recentlyViewed.items;

export const { addToRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
