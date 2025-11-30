## Overview
- Create a root `Projects` directory that contains one folder per project.
- Each project folder is named `<project_name>_<timestamp>` and includes either `architecture.md` or `task.md` populated from a standardized template.
- All docs include consistent metadata (version, author/owner, last updated, repository, branch, commit) and clear section headings.
- Apply NTFS permissions per project folder using least-privilege roles.
- Add a root `README.md` describing conventions and how to use the templates.

## Directory Structure
- Root: `Projects/`
- Per project: `Projects/<project_name>_<timestamp>/`
  - One of: `architecture.md` or `task.md`
- Timestamp format: `YYYYMMDD-HHMMSS` in UTC (e.g., `20251128-104530`).
- Name sanitization:
  - Convert spaces to `-` inside `<project_name>`; keep alphanumerics, `-`, `_`.
  - Remove invalid Windows filename characters: `\ / : * ? " < > |`.

## Choosing the Document Type
- Use `architecture.md` when the project is in engineering/design, focusing on system structure and decisions.
- Use `task.md` when planning or tracking requirements, deliverables, and milestones.
- Only one is required; both are allowed if useful (team’s choice).

## Standard Metadata (Front Matter)
- Include at the top of every markdown file:
```
---
title: <Project Title>
version: 0.1.0
last_updated: <ISO8601 UTC, e.g., 2025-11-28T10:45:30Z>
author: <Full Name>
owner: <Team/Org>
repository: <VCS URL>
branch: <branch>
commit: <short SHA or N/A>
status: Draft
---
```

## Template: architecture.md
```
---
title: <Project Title>
version: 0.1.0
last_updated: <ISO8601 UTC>
author: <Full Name>
owner: <Team/Org>
repository: <VCS URL>
branch: <branch>
commit: <short SHA>
status: Draft
---

# Architecture Overview
- Purpose and scope
- High-level description

# System Context
- Context diagram
- External systems and integrations

# Requirements Summary
- Functional requirements
- Non-functional (performance, scalability, security, compliance)

# Component Architecture
- Major components/services
- Responsibilities and interfaces
- Dependencies

# Data & Storage
- Data models
- Schemas
- Persistence strategy

# API & Contracts
- Public APIs (endpoints, payloads)
- Internal contracts

# Deployment & Operations
- Environments
- CI/CD
- Infrastructure (IaC references)

# Security
- Threat model
- AuthN/AuthZ
- Secrets management

# Observability
- Logging, metrics, tracing
- Alerting

# Performance & Capacity
- SLAs/SLOs/SLIs
- Benchmarks

# Risks & Decisions
- ADRs
- Trade-offs
- Open issues

# Changelog
- YYYY-MM-DD: Summary of change (author)
```

## Template: task.md
```
---
title: <Project Title>
version: 0.1.0
last_updated: <ISO8601 UTC>
author: <Full Name>
owner: <Team/Org>
repository: <VCS URL>
branch: <branch>
commit: <short SHA or N/A>
status: Draft
---

# Project Overview
- Goals and scope
- Stakeholders

# Requirements
- Must-haves
- Nice-to-haves

# Deliverables
- Artifacts and acceptance criteria

# Milestones & Timeline
- Milestone 1: description, due date
- Milestone 2: description, due date

# Tasks
- Task ID, description, owner, status

# Risks & Assumptions
- Known risks
- Assumptions

# Communications
- Cadence
- Channels

# Changelog
- YYYY-MM-DD: Summary of change (author)
```

## Root README.md Content
- Purpose: Explain the folder structure and documentation standards.
```
# Projects Directory

This directory standardizes how projects are organized and documented.

## Structure
- `Projects/<project_name>_<timestamp>/` contains one project.
- Include either `architecture.md` (engineering/design) or `task.md` (planning/requirements).

## Naming
- Use `<project_name>_<YYYYMMDD-HHMMSS>` in UTC.
- Allowed characters: letters, digits, `-`, `_`.
- Replace spaces with `-`; remove invalid Windows characters.

## Templates
- Both templates include a metadata front matter block and clear sections.
- Choose the template that matches the project’s current phase.

## Version Control
- Record `repository`, `branch`, and `commit` in the front matter.
- Update `version` and `last_updated` on every edit.

## Ownership
- Set `author` and `owner` fields.

## Access Controls
- Project folders use least-privilege NTFS ACLs (Admins: Full, Contributors: Modify, Readers: Read).

## Updating Docs
- Maintain a `Changelog` section with dated entries and authors.
```

## Access Controls & Permissions (Windows NTFS)
- Principle of least privilege:
  - Admins: Full control
  - Contributors: Modify, Read & Execute, List, Write (no permission change)
  - Readers: Read & Execute, List
- Implementation approach (to be run per project folder after creation):
```
icacls "g:\ai-projects-students\Projects\<project_name>_<timestamp>" /inheritance:r \
  /grant "<AdminsGroup>:(OI)(CI)F" \
  /grant "<ContributorsGroup>:(OI)(CI)M" \
  /grant "<ReadersGroup>:(OI)(CI)R"
```
- Replace `<AdminsGroup>`, `<ContributorsGroup>`, `<ReadersGroup>` with existing local/domain groups.
- Verify ACLs:
```
icacls "g:\ai-projects-students\Projects\<project_name>_<timestamp>"
```

## Automation (PowerShell Script Outline)
- Parameters: `-ProjectName`, `-DocType ('architecture'|'task')`, `-Author`, `-Owner`, `-AdminsGroup`, `-ContributorsGroup`, `-ReadersGroup`.
- Steps:
  - Sanitize `ProjectName`; generate UTC timestamp.
  - Create `Projects` root if missing.
  - Create project folder and selected markdown file.
  - Populate file from template with front matter and sections.
  - Set NTFS ACLs with `icacls`.
  - Log actions and output created paths.

## Implementation Steps (after approval)
1. Create `Projects` root directory under `g:\ai-projects-students`.
2. Prepare reusable template files for `architecture.md` and `task.md` in a `templates/` folder.
3. Write a PowerShell script `new-project.ps1` implementing the automation above.
4. Generate initial project folders for current initiatives using the script.
5. Apply ACLs per folder using configured groups and verify.
6. Add a root `README.md` explaining standards and usage.
7. Review with team; update templates and README if needed.

## Validation
- Confirm directory names and timestamps meet the convention.
- Open generated markdown and verify front matter fields and sections.
- Run `icacls` to ensure permissions are correct for each folder.
- Optionally add a pre-commit hook to check front matter presence and `last_updated` changes.

## Assumptions
- UTC timestamps are acceptable for consistency.
- Existing groups for Admins/Contributors/Readers are available or will be created by IT.
- The workspace root is `g:\ai-projects-students`.

## Next Step
- Confirm this plan and group names. On approval, I will implement the structure, script, templates, and README, and generate the first project folders.