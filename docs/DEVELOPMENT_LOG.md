# FindIt — Development Log

**Project:** FindIt — Smart Campus Lost & Found  
**Event:** JUGAAR JUNCTION 2026  
**Version:** 1.0

## Purpose
This document records the actual development activities, decisions, completed tasks, challenges, and changes made during the development of FindIt.

## Development Entries

### Entry Template

**Date:**  
**Time:**  
**Team Member(s):**  

**Tasks Planned:**
- 

**Tasks Completed:**
- 

**Files Created or Modified:**
- 

**Challenges / Issues:**
- 

**Solutions / Decisions:**
- 

**Pending Tasks:**
- 

---

*All entries must reflect actual work performed by the team.*
## 19 November 2026 � Development Progress

### Completed
- Initialized the React + Vite project.
- Configured Tailwind CSS v4 and Lucide React.
- Built the initial responsive FindIt homepage.
- Implemented homepage navigation and sample-item search.
- Fixed the Lightning CSS Windows dependency issue.
- Verified ESLint successfully.
- Verified the production build successfully.
- Created `src/utils/storage.js` for the upcoming LocalStorage implementation.

### Current Status
- Homepage: Working
- ESLint: Passing
- Production build: Passing
- LocalStorage utility: File created; implementation pending.

### Next Task
- Implement LocalStorage functions according to the FindIt SRS.

### LocalStorage Utility Completed
- Implemented `getItems()` and `addItem()`.
- Implemented `updateItemStatus()`.
- Implemented `getClaims()` and `addClaim()`.
- Implemented `updateClaimStatus()`.
- Added safe LocalStorage reading and JSON serialization.
- Verified the implementation with ESLint: passing.

### Current Status
- LocalStorage utility: Implemented.
- Integration with the React interface: Pending.


---

## 24 November 2026 — Development Progress

**Team Member(s):** FindIt Development Team

### Tasks Planned
- Integrate report submission with the homepage.
- Improve Lost and Found reporting navigation.
- Implement item filtering.
- Develop the initial matching engine.

### Tasks Completed
- Integrated LocalStorage reports with the homepage.
- Added USER REPORT and DEMO DATA labels to distinguish user submissions from illustrative sample data.
- Added separate Report Lost and Report Found actions.
- Connected desktop and mobile navigation to the reporting forms.
- Implemented All Items, Lost Items, and Found Items filters.
- Integrated search and filtering so they work together.
- Improved empty-state messages and the Clear Search and Filters action.
- Updated the Explore section description.
- Implemented `findMatches()` in the LocalStorage utility.
- Added matching scores based on category (30), colour (25), location (25), and description keywords (up to 20).
- Restricted matching to active Lost and Found reports.
- Kept private ownership clues out of matching.

### Files Modified
- `src/App.jsx`
- `src/components/ReportForm.jsx`
- `src/utils/storage.js`

### Challenges / Issues
- The initial filter implementation returned all items when the search field was empty.
- The Explore section description no longer reflected the implemented functionality.

### Solutions / Decisions
- Removed the early return so search and type filtering work together.
- Updated the Explore section description.
- Kept the matching engine separate from the user interface until its logic is verified.

### Verification
- ESLint: Passed.
- Production build: Passed.
- Search and filters: Tested successfully.
- Clear Search and Filters: Tested successfully.
- Lost and Found reporting forms: Tested successfully.

### Pending Tasks
- Test the matching engine with sample Lost and Found records.
- Build the Matches interface.
- Continue implementing the remaining SRS functionality, including claims and returned-item management.

---