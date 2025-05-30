// src/store/stepStore.js
import { create } from 'zustand';

const useStepStore = create((set) => ({

  // Step 전체 페이지
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),

  isStepCompleted: [],
  addStepCompleted: (step) => set((state) => {
    if (!state.isStepCompleted.includes(step)) {
      return { isStepCompleted: [...state.isStepCompleted, step] };
    }
    return {};
  }),

  removeStepCompleted: (step) => set((state) => ({
    isStepCompleted: state.isStepCompleted.filter(s => s !== step)
  })),
  
  // Step1
  selectedData: "basic",
  setSelectedData: (data) => set({ selectedData: data }),

  basicFileInfo: null,
  setBasicFileInfo: (file) => set({ basicFileInfo: file }),

  plusFileInfo: null,
  setPlusFileInfo: (file) => set({ plusFileInfo: file }),

  basicFileStatus: "idle",
  setBasicFileStatus: (status) => set({ basicFileStatus: status }),

  plusFileStatus: "idle",
  setPlusFileStatus: (status) => set({ plusFileStatus: status }),

  // Step2
  facilityName: "",
  setFacilityName: (name) => set({ facilityName: name }),

  selectedRange: "100",
  setSelectedRange: (range) => set({ selectedRange: range }),

  selectedCity: "",
  setSelectedCity: (city) => set({ selectedCity: city }),

  reset: () => set({
    currentStep: 1,
    isStepCompleted: [],
    selectedData: "basic",
    basicFileInfo: null,
    plusFileInfo: null,
    basicFileStatus: "idle",
    plusFileStatus: "idle",
    facilityName: "",
    selectedRange: "100",
    selectedCity: "",
  }),
}));

export default useStepStore;