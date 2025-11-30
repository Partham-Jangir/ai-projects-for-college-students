# Projects Root

- Purpose: centralize project documentation with standardized structure and templates.
- Structure: each project resides in `Projects` as `project_name_timestamp`.
- Required docs: include either `architecture.md` or `task.md` per project.
- Templates: available in `../templates`.
- Timestamp format: `yyyyMMddHHmmss`.

## Usage

- Create a project with `scripts/new-project.ps1`.
- Example: `powershell -File ..\\scripts\\new-project.ps1 -ProjectName PaymentService -Type architecture -Author Alice -Repository https://example.com/repo.git -Version 1.0.0`.

## Documentation Standards

- Clear headings and sections.
- Include version control information: repository, branching, version.
- Include last updated timestamp and author/owner details.

## Access Controls

- Owner: Full control.
- `Administrators`: Full control.
- `Users`: Read & Execute.
- Inheritance: disabled at the project folder level.
