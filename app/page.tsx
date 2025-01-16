"use client"
import { useState } from "react";
import initialData from "./data/input.json"
import { FormData, useDntelForm } from './hooks/useDntelForm'; // Import the custom hook

// Explicitly type the imported JSON data as FormData

export default function Home() {
  // const [data, setData] = useState<FormData>()

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
    <div className="p-4">
      <div className="flex flex-wrap gap-8">
        {/* Render the FormComponent */}
        <FormComponent />
      </div>
      <div className="mt-4">
        <button onClick={expandAll}>Expand All</button>
        <button onClick={collapseAll}>Collapse All</button>
      </div>
      <div className="mt-4">
        <button onClick={reset}>Reset</button>
        <button onClick={clearLS}>ClearLS</button>
      </div>
      <div className="mt-4">
        <p>Last Change: {lastChanged ? new Date(lastChanged).toLocaleString() : "No changes"}</p>
      </div>
      <div className="mt-4">
        <button onClick={() => setEditMode(true)}>Enable Edit Mode</button>
        <button onClick={() => setEditMode(false)}>Disable Edit Mode</button>
      </div>
    </div>
  );
}
