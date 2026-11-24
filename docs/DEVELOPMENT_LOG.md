# FindIt — Development Log

**Project:** FindIt — Smart Campus Lost & Found  
**Event:** JUGAAR JUNCTION 2026  
**Version:** 1.0  
**Technology Stack:** React, Vite, JavaScript, Tailwind CSS v4, Lucide React  
**Data Storage:** Browser LocalStorage

---

## 1. Purpose

This document maintains a chronological record of the actual development activities performed during the development of FindIt.

It records:
- Planned and completed tasks
- Files created or modified
- Technical challenges and their solutions
- Development decisions
- Testing and verification results
- Pending tasks and future development work

All entries must accurately reflect work performed by the development team.

---

## 2. Development Entry Template

Use the following template for each new development session.

### Entry — [Date]

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

**Verification / Testing:**
- 

**Pending Tasks:**
- 

---

## 3. Development History

## Entry 01 — 19 November 2026

### Project Initialization

**Completed Tasks:**
- Initialized the React + Vite project.
- Configured Tailwind CSS v4.
- Integrated Lucide React for icons.
- Developed the initial responsive FindIt homepage.
- Implemented homepage navigation.
- Added initial sample-item search functionality.
- Fixed the Lightning CSS Windows dependency issue.
- Created `src/utils/storage.js` for LocalStorage functionality.

### LocalStorage Implementation

**Completed Tasks:**
- Implemented `getItems()` to retrieve stored reports.
- Implemented `addItem()` to save new reports.
- Implemented `updateItemStatus()` to update report statuses.
- Implemented `getClaims()` to retrieve stored claims.
- Implemented `addClaim()` to save claims.
- Implemented `updateClaimStatus()` to update claim statuses.
- Added safe LocalStorage reading and JSON serialization.

**Files Created or Modified:**
- `src/utils/storage.js`
- Initial React and Vite project files.

**Challenges / Issues:**
- Encountered a Windows dependency issue involving Lightning CSS.

**Solutions / Decisions:**
- Resolved the dependency installation issue.
- Used browser LocalStorage for the MVP instead of introducing a backend.

**Verification / Testing:**
- ESLint: Passed.
- Production build: Passed.
- LocalStorage utility implementation: Completed.

**Pending Tasks:**
- Integrate LocalStorage reports with the React interface.
- Implement the remaining reporting and matching functionality.

---

## Entry 02 — 24 November 2026

### Tasks Planned

- Integrate report submission with the homepage.
- Improve Lost and Found reporting navigation.
- Implement item type filtering.
- Develop the initial item matching engine.

### Tasks Completed

**Report Management and Homepage Integration**
- Integrated LocalStorage reports with the homepage.
- Connected submitted reports to the homepage listing.
- Added `USER REPORT` and `DEMO DATA` labels to distinguish user submissions from illustrative sample reports.
- Added separate Report Lost and Report Found actions.
- Connected desktop and mobile navigation to the reporting forms.

**Search and Filtering**
- Implemented All Items, Lost Items, and Found Items filters.
- Integrated search and type filtering so both work together.
- Improved empty-state messages according to the selected filter.
- Added a Clear Search and Filters action.
- Updated the Explore section description to reflect the implemented functionality.

**Initial Matching Engine**
- Implemented `findMatches()` in `src/utils/storage.js`.
- Added category matching with a weight of 30 points.
- Added colour matching with a weight of 25 points.
- Added location matching with a weight of 25 points.
- Added description keyword matching with a maximum of 20 points.
- Restricted matching to active Lost and Found reports.
- Sorted match suggestions by descending score.
- Kept private ownership clues out of the matching logic.

### Files Modified

- `src/App.jsx`
- `src/components/ReportForm.jsx`
- `src/utils/storage.js`
- `docs/DEVELOPMENT_LOG.md`

### Challenges / Issues

- The initial filter implementation returned all items when the search field was empty.
- The Explore section description no longer reflected the implemented functionality.

### Solutions / Decisions

- Removed the early return from the filtering logic so search and type filters work together.
- Updated the Explore section description.
- Kept the matching engine separate from the user interface until its logic is tested.

### Verification and Testing

- ESLint: Passed.
- Production build: Passed.
- Search functionality: Tested successfully.
- Lost and Found filters: Tested successfully.
- Clear Search and Filters: Tested successfully.
- Lost and Found reporting forms: Tested successfully.
- Homepage report integration: Tested successfully.

### Git and Version Control

- Committed the completed changes to the `main` branch.
- Commit ID: `4c2163e`
- Commit message: `feat: add report filtering and item matching engine`
- Pushed the commit successfully to the GitHub repository.

### Pending Tasks

- Test the matching engine using sample Lost and Found records.
- Build the Matches interface.
- Display match suggestions to users.
- Implement the claims management workflow.
- Implement returned-item status management.
- Continue development according to the Software Requirements Specification (SRS).

---

## 4. Current Development Status

| Component | Status |
|---|---|
| React + Vite project setup | Completed |
| Tailwind CSS configuration | Completed |
| Responsive homepage | Implemented |
| Lost and Found reporting forms | Working |
| LocalStorage item management | Implemented |
| LocalStorage claim utilities | Implemented |
| Homepage report integration | Working |
| Search functionality | Working |
| Lost/Found type filters | Working |
| Demo and user report identification | Implemented |
| Initial matching engine | Implemented; testing pending |
| Matches interface | Pending |
| Claims management interface | Pending |
| Returned-item management | Pending |

---

## 5. Development Rules

1. Record only tasks that have actually been performed.
2. Document technical issues and their actual solutions.
3. Record files created or modified during each development session.
4. Run ESLint and the production build after significant code changes.
5. Keep the development log consistent with the SRS and actual application behavior.
6. Update this document after each meaningful development session.
7. Do not mark pending features as completed before implementation and testing.

---

**Document:** FindIt Development Log  
**Version:** 1.0  
**Last Updated:** 24 November 2026