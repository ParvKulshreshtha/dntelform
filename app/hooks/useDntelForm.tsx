import { useState, useEffect, useCallback } from 'react';
import { BiArrowFromTop } from 'react-icons/bi';
import { IoInformationCircleOutline } from 'react-icons/io5';

type Field = {
  value: string;
  title: string;
  interface: { type: 'text' | 'date' | 'boolean' | 'select' };
  key: string;
  required: boolean;
  defaultValue: string;
  defaultOptions: string[];
  hidden: boolean;
  placeholder: string;
  disabled: boolean;
  tooltip: string;
  colSpan: string;
};

type Section = {
  id: string,
  title: string;
  order: number;
  layout?: string;
  fields: { [key: string]: Field };
  stats: { filled: number; total: number };
  bgColor?: string;
  tooltip?: string;
};

export type FormData = {
  sections: { [key: string]: Section };
};

type UseDntelForm = {
  FormComponent: React.FC;
  changes: Record<string, any>;
  activeSection: number;
  expandedSections: string[];
  lastChanged: number | null;
  editMode: boolean;
  expandAll: () => void;
  collapseAll: () => void;
  scrollToSection: (id: string) => void;
  expandSection: (id: string) => void;
  setEditMode: (enabled: boolean) => void;
  changeValue: (key: string, value: any) => void;
  reset: () => void;
  clearLS: () => void;
};

export const useDntelForm = (initialData: FormData, id?: string): UseDntelForm => {
  const [changes, setChanges] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<number>(-1);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [lastChanged, setLastChanged] = useState<number | null>(null);
  const [editMode, setEditModeState] = useState<boolean>(true);

  // Load draft data from localStorage if id is provided
  useEffect(() => {
    if (id) {
      const savedDraft = localStorage.getItem(id);
      if (savedDraft) {
        setChanges(JSON.parse(savedDraft));
      }
    }
  }, [id]);

  // Update localStorage whenever changes are made
  useEffect(() => {
    if (id && changes) {
      localStorage.setItem(id, JSON.stringify(changes));
    }
  }, [id, changes]);

  // Utility functions
  const expandAll = () => setExpandedSections(Object.keys(initialData.sections));
  const collapseAll = () => setExpandedSections([]);
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  const expandSection = (id: string) => {
    setExpandedSections((prev) => [...prev, id]);
  };

  const changeValue = (key: string, value: any) => {
    setChanges((prev) => {
      const newChanges = { ...prev, [key]: value };
      setLastChanged(Date.now());
      return newChanges;
    });
  };

  const reset = () => setChanges({});
  const clearLS = () => {
    if (id) {
      localStorage.removeItem(id);
    }
  };

  const setEditMode = (enabled: boolean) => {
    setEditModeState(enabled);
  };

  // Intersection observer logic to detect visibility of sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionOrder = parseInt(entry.target.getAttribute('data-order') || '-1');
          if (entry.isIntersecting) {
            setActiveSection(sectionOrder);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each section
    Object.values(initialData.sections).forEach((section) => {
      const element = document.querySelector(`#section-${section.order.toString()}`);
      if (element) {
        element.setAttribute('data-order', section.order.toString());
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [initialData]);

  // Form component rendering logic
  const FormComponent: React.FC = () => {
    const [data, setData] = useState<Section[]>([]);

    useEffect(() => {
        const sections = initialData.sections;
        const sectionData:Section[] = Object.keys(sections)
          .sort((a, b) => sections[a].order - sections[b].order) // Sorting based on order field of each section
          .map(key => ({
              ...sections[key], 
            id: key,     
          }));
      
        setData(sectionData);
      }, [initialData]);
      
      
    return (
      <div className="p-4">
        <div className="flex flex-wrap gap-8">
          {data.map((section) => {
              let layoutClass = '';
              if (section.layout === 'full') {
                  layoutClass = 'w-full';
                } else if (section.layout === 'right' || section.layout === 'left') {
                    layoutClass = 'w-1/2';
                }

                console.log(expandedSections)
                
                return (
                    <div
                        key={section.order}
                        id={`section-${section.order}`}
                        className={`h-fit box-border p-6 rounded-lg text-green-900 ${layoutClass}`}
                        style={{ background: section.bgColor }}
                    >
                        <div className="flex justify-between w-full">
                            <h2 className="text-lg font-semibold mb-2">
                                {section.title} ({section.stats.filled}/{section.stats.total})
                            </h2>
                            <BiArrowFromTop  onClick={()=>{
                                setExpandedSections(prev=>prev.includes(section.id) ? prev.filter(item => item!==section.id):[...prev, section.id])
                            }}/>
                        </div>

                        <ul className="flex flex-wrap">
                        {expandedSections.includes(section.id)&&Object.values(section.fields).map((field) => {
                            let fieldWidthClass = '';
                            if (field.colSpan === '2') {
                            fieldWidthClass = 'w-full';
                            } else if (field.colSpan === '1') {
                            fieldWidthClass = 'w-1/2';
                            }

                    const currentValue = changes[field.key] || field.value || field.defaultValue;

                    return (
                      <div key={field.key} className={`${fieldWidthClass} py-4 pl-4`}>
                        <div className="">
                          <div className="font-medium flex items-center gap-1">
                            {field.title}
                            {field.tooltip && <IoInformationCircleOutline className="h-5 w-5" />}
                          </div>
                          {editMode ? (
                            <input
                              type={field?.interface?.type}
                              value={currentValue || ""}
                              onChange={(e) => changeValue(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full text-sm text-gray-700 rounded p-1.5 mt-1"
                            />
                          ) : (
                            <div className="text-sm text-gray-700">
                              {currentValue || "\u00A0"}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return {
    FormComponent,
    changes,
    activeSection,
    expandedSections,
    lastChanged,
    editMode,
    expandAll,
    collapseAll,
    scrollToSection,
    expandSection,
    setEditMode,
    changeValue,
    reset,
    clearLS,
  };
};
