import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ChevronDown } from 'react-feather'; // Optional, for custom icons

/**
 * Accordion Component (FAQ style)
 * 
 * @param panels Array [{}, ...] -> { title: '', values: [] }
 */
const AccordionComponent = ({ panels = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Only one panel open at a time
  };

  return (
    <div className="space-y-2 w-full">
      {panels.map((panel, index) => (
        <Accordion
          key={panel.key || index}
          expanded={expanded === (panel.key || index)} // Control which panel is expanded
          onChange={handleAccordionChange(panel.key || index)}
          className="border-t border-gray-200" // Border style using Tailwind
        >
          <AccordionSummary
            expandIcon={<ChevronDown className="text-gray-500" />} // Icon (optional)
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            className="py-3" // Padding using Tailwind
          >
            <Typography className="text-lg !font-semibold text-gray-900 !font-montserrat">
              {panel.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="py-4 px-6 bg-gray-50">
            {Array.isArray(panel.values) && panel.values.length > 0 ? (
              panel.values.map((value, idx) => (
                <div key={`${index}-${idx}`} className="text-gray-700 mb-2 text-[15px] md:text-[17px] font-medium">
                  {value}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No content available</div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionComponent;
