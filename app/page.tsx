"use client"
import { useState } from "react";
import initialData from "./data/input.json"
import { FormData, useDntelForm } from './hooks/useDntelForm'; // Import the custom hook
import Navigation from "./components/Navigation";

export default function Home() {
  const { 
    FormComponent, 
    changes, 
    expandedSections, 
    lastChanged, 
    editMode,
    setEditMode, 
    expandAll, 
    collapseAll, 
    scrollToSection, 
    expandSection,
    clearLS,
    reset
  } = useDntelForm(initialData, "uniqueFormId");

  return (
    <div className="">
      <Navigation 
        expandAll={expandAll}
        collapseAll={collapseAll}
        reset={reset}
        clearLS={clearLS}
        setEditMode={setEditMode}
        FormComponent={FormComponent}
      />

      <FormComponent />
    </div>
  );
}
