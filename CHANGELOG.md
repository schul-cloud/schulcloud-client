# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Allowed Types of change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

## Unreleased

### Added

- SC-9148 - add env var GLOBAL_ANNOUNCEMENT_ADMIN_TEACHER
- OPS-2574 - Removeing autodeployed branches for developers if branch deleted

### Removed

-   SC-8440 - remove analogue consent button from admin classes page and fix v2
-   SC-8073 - removing functionality of adding student from previous years

### Changed

-   SC-9196 - fixed submissions overview
-   SC-7393 - adds legal text about consent on first login on n21
-   SC-8448 - passes merlinReference ID to server for Merlin items
-   SC-9018; SC-9003 - replaces usage of api /schools enpoint for schoolsList in login & registration
-   SC-9101 - sync & sort lang files
-   SC-9124 - new feature flags for Course copy/import/share & Topic share buttons
-   SC-9124 - add feature flags for course copy/import/share to configmaps
-   OPS-2579 - change path to the sotrage.
-   SC-9167 - fixed Show/Hide password feature in account page
-   SC-8887 - Data privacy in footer links to School, SHD uploaded Document, with fallback to S3 PDF
-   change default lernstore mode to edusharing

## [26.5.1] - 2021-06-29

### Added

-   SC-9143 - add teacher open task dashboard

## [26.5.0] - 2021-06-28

### Added

-   SC-9143 - change icons task dashboard

## [26.4.2] - 2021-06-24

### Changed

-   OPS-2465 - changes build pipeline to github actions

## [26.4.1] - 2021-06-16

-   rename permission TASK_DASHBOARD_VIEW_V3

## [26.4.0] - 2021-06-04

### Changed

-   SC-9023 - homework nuxt dashboard

## [26.2.2] - 2021-06-04

### Changed

-   SC-9110 - removed unused static files

## [26.2.1] - 2021-06-02

### Changed

-   SC-8822 - fix phone number in imprint

## 26.2.0

### Changed

-   SC-7042 - fix permission, allowing teachers to send invitation to students
-   OPS-2418 - execute_E2E_tests
-   OPS-2445 - change Docker login to build
-   SC-8440 - fix manual consent for class
-   SC-8157 - personal files filter margin correction
-   OPS-1499 - Add feature to CI Pipeline and provide manual deployments of branches
-   SC-8599 - changes to support contact page 2.0
-   SC-6950 - validation for officialSchoolNumber now allows 6 digits instead of 5
-   SC-8668 - fixed small typo in manage school page
-   SC-8170 - fixed footer line break
-   SC-6232 - fixed due date format and hint
-   SC-8730 - Fixed sharing text for sharing whole course
-   SC-9040 - Changing placeholder text in task
-   OPS-1499 - Add feature to CI Pipeline and provide manual deployments of branches
-   SC-8712 - Changing bad default text when assigning topics
-   SC-8342 - Fixed show password button

### removed

-   SC-1464 - removed share button from team section

## [26.1.2] - 2021-05-18

-   SC-9062 - remove inline JavaScript for homework section

## [26.1.1] - 2021-05-17

-   SC-9061 - require password for changing emails

## [26.1.0]

## [26.0.7] - 2021-04-20

### Fixed

-   SC-8931 - fix typo

## [26.0.6] - 2021-04-15

### Fixed

-   SC-8931 - add school and alert caching for startpage

## [26.0.5] - 2021-04-13

### Fixed

-   SC-8748 - bump feathers-mongoose from 6.3.0 to 8.3.1

## [26.0.4] - 2021-03-24

### Changed

-   SC-8822 - add availability to phone number in imprint

## [26.0.3] - 2021-03-24

### Changed

-   SC-8822 - Update contact Numbers in Impressum

## [26.0.2] - 2021-03-22

### Removed

-   SC-8595 - remove language hint from the system
-   SC-8409 - remove FAQ from help page

### Changed

-   SC-8599 - remodeled help area contact page / follow up PR
-   SC-8660 – changed text of the footer in the section job offers for the instances boss open and thr
-   SC-8408 - improved course update logic. Delete all events for the course before creating new
-   SC-8408 - improved course update logic. Delete all events for the course before creating new
-   SC-8597 - changing color of the course headline into primary

### Added

-   SC-8595 - Added DE,EN,ES translations for the landing page and missing gender
-   SC-8447 - Added filter for logging in error case.
-   SC-8341 - fix bug with teams with deleted user
-   SC-8156 - Added Spanish as an available language
-   SC-8609 – Added mail-card.hbs for theme int

### Fixed

-   SC-8248 - follow up to fix issue that came from removing the helpdesk completely
-   SC-8595 - remove linguistic note completely
-   SC-8599 - fixed typo
-   SC-6679 - fixed table styling in topic text-component
-   SC-8618 - fixed follow-up issues from ticket SC-8156 related to introducing Spanish to the client
-   SC-6923 - Fixed help area search with csp url
-   SC-8414 - Made school number field editable for LDAP schools
-   SC-8594 - make drag icon visible again
-   SC-8318 - actualize gender language
-   SC-8861 - restore changes lost after release merge

## [26.0.1] - 2021-03-17

### Fixed

-   [25.6.11] -> [26.0.1]

## [26.0.0]

## [25.6.11] - 2021-03-12

### Fixed

-   SC-8211 - Fixed course events duplications

## [25.6.3] - 2021-02-24

### Fixed

-   SC-8686 - Personalized notification message

## [25.6.2] - 2021-02-12

### Fixed

-   VOR-3 - Sanitize promtheus metrics route for link hashes.

## [25.6.1] - 2021-02-12

### Changed

-   VOR-2 - Adjusted the default for searching for teachers from other schools

## [25.6.0] - 2021-02-09

### Removed

-   SC-8660 – Remove team-link in the footer and the team-page
-   SC-8248 – Remove school-admin helpdesk-functionality in Schul-Cloud
-   SC-6311 - Removed itslearning from available system types
-   SC-8495 - Removed the link datenschutzbeauftragter@hpi-schul-cloud.de from the footer
-   SC-8609 – remove section "HPI" including text and e-mail address on theme thr and BRB

### Changed

-   SC-8164 - Apply deletion concept to the deletion of students and teachers
-   SC-8041 Warning text for changing of county/kreis and officialSchoolNumber
-   SC-8356 - add docker login helper
-   SC-8331 - increase node version to match current lts (currently 12.16 to 14)

### Fixed

-   SC-8416 - Show logo on tablet on subpages
-   SC-6966 - validation of the course teacher input field, lengthOfLesson with min value of 0
-   SC-8414 - Made school number field editable for LDAP schools
-   SC-8531 - Restored school administration missing text
-   SC-6363 - Fix printing problem
-   SC-7602 - Show error by registration when same email for a student and parent
-   SC-6966 - validation of the course teacher input field, lengthOfLesson with min value of 0, and add some extra validations
-   SC-8337 - Better error handling for file upload
-   SC-8259 - limited the length of the task title/headline
-   SC-7345 - the linguistic note shown only for the German language
-   SC-8307 - fixed date formater bug by initial page loading
-   SC-8272 - fixed displaying of the error message for submissions with no due date
-   SC-8210 - remove possibility for students to create tasks
-   SC-8575 - Layout issues on tasks page when description consists of more than two rows

## 25.5.4

### Added

-   SC-8447 - add feature flag to enable or disable request logs

## 25.5.3

### Fixed

-   SC-8189 - fixed course event duplication by updating the course

## 25.5.2

### Fixed

-   SC-8325 - clients error handling on oauth2 routes
-   SC-8449 - hardcoded platform names used for authentication dialog and in mouseover of iframe

## 25.5.1

### Added

-   SC-5287 - Iframe depseudonymization for Safari
-   SC-8377 - add ssl proxy for testing oauth2 iframe locally
-   SC-8358 - refactor tool naming, add safari bettermarks hint

## 25.5.0

### Fixed

-   SC-5710 - Updated the accessibility of the course page with fixed delete button for course time (for keyboard users)

## [25.4.3]

### Changed

-   SC-8321 cache and hash static assets

## [25.4.2]

### Fixed

-   SC-8337 - Better error handling for file upload

## [25.4.1]

-   Update from 25.3.6 into master

## 25.4.0

### Added

-   SC-7824 - Set proper email address and label for data privacy
-   SC-7542 - Add kreis to school edit.
-   SC-6825 - change collapsable icon fix
-   SC-6825 - change collapsable icon
-   SC-6619 - fixed text for registration in all other schools
-   SC-5797 - Due to new test creation: showRegularTaskOnDashboard, added new data-testid's

### Fixed

-   SC-7686 - Fixed naming convention for Lern-Store
-   SC-7126 - Fixed sort of years on create class select
-   SC-7848 - Fixed no autofill of password in user settings
-   SC-6975 - Fixed button text on declare consent
-   SC-7900 - Fixed text for inviting experts
-   SC-7983 - Fixed that topic is now choosable after select of course
-   SC-7771 - Fixed hint for teachers when editing a course - fix
-   SC-7771 - Fixed hint for teachers when editing a course
-   SC-5498 - Fixed typo in account page
-   SC-7842 - Fixed typo on about page
-   SC-7874 - remove access to removed env variables
-   SC-8075 Fixed nbc landing page ghost
-   The common import after hotfix merge
-   SC-7793 - Set/activate new ldap route in administration page

### Changed

-   update location of common
-   SC-7889 - User receives consent screen at first login after new upload of privacy agreement

## 25.3.6

### Fixed

-   SC-8225: Fixed hiding messenger school settings

## 25.3.5 - 2020-12-16

### Added

-   SC-8220 - new env `SKIP_CALENDAR_DASHBOARD_REQUEST` for performance reasons

## 25.3.4

### Added

-   SC-8004 - add prometheus api metrics

## 25.3.3

### Fixed

-   SC-8080 After introduction of the timezones we've got an issue with Daylight Saving Time by course creation.
    This change has fixed the issue so that every course starts at the stable time regardless daylight saving time changes

## 25.3.2

### Fixed

-   SC-8075 Fixed nbc landing page ghost

## 25.3.1

### Fixed

-   SC-6727 Change email addresses for tickets for Niedersachsen - fix label text

## 25.3.0

### Added

-   SC-6662 - Add data-testid in homework for integration test
-   SC-7571 - fixed registration link generation (performance issues)
-   SC-7447 - Add warning text for links when leaving the schul-cloud platform
-   SC-6293 - added option to school admin to disable lernstore for students
-   SC-7413 - Add winston handler for logging unhandled rejection and exceptions
-   SC-5942 - Add trim() before email for password recovery got send to server
-   OPS-1297 - Added Changelog github action
-   SC-6596 - Added school option to allow students to create chat rooms

### Fixed

-   SC-1589 - Fixed error handling on team creation
-   SC-5179 - Fixed CKEditor on homework to insert images from Course instead of My Files
-   SC-7667 - Fixed help desk displays my own local time
-   SC-7652 - Fixed teacher creates a calendar in team then Dashboard empty
-   SC-7353 - fixed course sharing between teachers
-   SC-7645 - Fixed team calendar timezone bug
-   SC-7666 - Fixed rss translation key
-   SC-5555 - Fixed class names not being visible in course creation in some cases
-   SC-7463 - Fixed undefined value when requesting school systems login
-   SC-7392 fix create event for teams / courses
-   SC-6931 fixed link names in Niedersachsen, Open and Thueringen to privacy and termsOfUse on homepage
-   SC-6721 - fixed classes list in course administration
-   SC-7084 - changed file permission name Mitglied to Teilnehmer
-   SC-5501 - fixed grammar issue for password recovery request
-   SC-7589 - fixed correct display for age while first login and change of sentence structure for clearance
-   SC-7538 - fixed and enabled sorting on /files

### Changed

-   SC-7530 rename SHOW_VERSION to FEATURE_SHOW_VERSION_ENABLED
-   update commons to 1.3.0 to enable printing current config on startup, fix default.json to be valid by adding cookie defaults
-   SC-6951 removes via text from embeded course content
-   SC-6870 use don't show again checkbox value even if the admin goes to the settings page
-   IMP-160 rename integration test repository
-   SC-7474 pull docker container for tests if commit id exists on docker hub

## 25.2.7

### Fixed

-   SC-8042 update sort order of students by creating classes

## 25.2.6

### Fixed

-   SC-8027 Fixed school login event listener issue

## 25.2.5

### Fixed

-   SC-8000 revert SC-7493 due it causes logout issues in registration and for thr

## 25.2.4

### Fixed

-   SC-7878 reverted dropdowns and multiselects to the old widget

## 25.2.3

### Added

-   SC-6727 Change email addresses for tickets for Niedersachsen

## 25.2.2

### Fixed

-   SC-7881 restored fix done in SC-7463 which fixed logging in with external systems

## 25.2.1

### Fixed

-   SC-7803 comments out mocha test for legacy lern-store

## 25.2.0

### Fixed

-   SC-7453 fixed course/team event handling
-   SC-7392 fix create event for teams / courses
-   SC-7653 Workaround for winter/summer time issue
-   SC-7590 Fixed missing permission for enabling consent by teachers
-   SC-7151 Fixing sentence structure while registration for parents
-   SC-7350 Fix invalid date
-   SC-7182 do not allow to open office files in new windows

### Changed

-   SC-6973 Small improvments for logging and error handling
-   SC-6060 Cookie configuration
-   SC-4209 Choose the same move icon for course topics and topic editor

### Added

-   SC-6870 - Added UX improvements for Matrix messenger announcement
-   SC-7083 - Added input to get the school id from admin

## [25.1.7] - 2020-10-27

### Fixed

-   SC-7502 - Fixed disabled attribute definition on registration link buttons

## [25.1.6] - 2020-10-21

### Added

-   SC-7447 - Add warning text for links when leaving the schul-cloud platform

## [25.1.5] - 2020-10-27

### Fixed

-   SC-7490 fixed get request for landing pages which are not from ghost

## [25.1.4] - 2020-10-26

### Fixed

-   SC-6735 additional fix - administration remove consent triggers import hash generation

## [25.1.3] - 2020-10-21

### Fixed

-   SC-6735 administration remove consent triggers import hash generation

## [25.1.2] - 2020-10-20

### Fixed

-   SC-7437 fixed display of user name on qr codes

## [25.1.1] - 2020-10-15

### Fixed

-   SC-7085 fixed importHash error when asking parent consent

## [25.0.7] - 2020-10-09

### Fixed

-   SC-7171 fix asking for confirmation after consent update

### Added

-   SC-6582 Add bidirectional messenger settings for course creation

## [25.0.6] - 2020-10-01

### Added

-   SC-6973 add importHash to registrationPins post request

## [25.0.5] - 2020-09-30

### Fixed

-   SC-6945 Add requirement for etherpad section title to fix null matching error

## [25.0.4] - 2020-09-30

### Changed

-   SC-6567 clear and improve logging in error case
-   SC-5858 removed chosen library from the code (Accessibility issues)

## [25.0.3] - 2020-09-29

### Fixed

-   SC-6940 hanndle undefined in language detection

## [25.0.2] - 2020-09-29

### Fixed

-   SC-6927 Admins can delete teachers again

## [25.0.1] - 2020-09-28

### Fixed

-   SC-6932 added translation keys instead of hardcoded strings for sidebar items

## [24.5.7] - 2020-09-22

### Fixed

-   SC-6845 Fixed reset of consent property if inputs disabled

## [24.5.6] - 2020-09-22

### Fixed

-   SC-6823 - Fixed inserting media in comments for homework correction

## [24.5.5] - 2020-09-22

### Fixed

-   SC-6630 Fixed email validation using an undefined value when inviting experts to a team.

## [24.5.4] - 2020-09-21

### Fixed

-   SC-6762 Fix file upload permissions for evaluation

## [24.5.3] - 2020-09-18

### Fixed

-   SC-6761 Fixed messenger activation in courses

## [24.5.2] - 2020-09-16

### Fixed

-   SC-6637 Updated CSS of QR codes to avoid broken print layout

## [24.5.1] - 2020-09-14

### Fixed

-   SC-6761 Fixed individual registration emails

## [24.4.2] - 2020-09-09

### Fixed

-   SC-6533 - Login not possible if admin reset password

    -   SC-5707 Added detection of browser language
    -   SC-5706 Added language selection within teacher registration
    -   SC-6019 Added tabbar to classes administration
    -   SC-5955 Changed links to Lernen.cloud
    -   SC-5644 navigation and the general structure of pages made more accessible (a11y)
    -   SC-6245 If students can create teams, they can also invite other students to teams

## [24.4.1] - 2020-9-01

-   SC-6526 Fixed inserting files in CKEditor for topics

## [24.4.0] - 2020-8-31

-   SC-6019 Added tabbar to classes administration
-   SC-5955 Changed links to Lernen.cloud
-   SC-5644 navigation and the general structure of pages made more accessible (a11y)

## [24.3.2] - 2020-08-26

-   SC-6382 fix first login shown on every login in tsp

## [24.3.1] - 2020-08-26

-   SC-6382 fix default wellcome text for tsp

## [24.3.0] - 2020-08-25

### Changed - 24.3.0

-   SC-5644 navigation and the general structure of pages made more accessible (a11y)

## [24.2.5] - 2020-08-20

### Fixed - 24.2.5

-   SC-6296 Only show edit and delete button for eligible systems

## [24.2.4] - 2020-08-20

## [24.2.3] - 2020-08-18

### Changed - 24.2.3

-   SC-6239 Changed default email domains in many different places from @schul-cloud.org to @hpi-schul-cloud.de
-   SC-6239 Changed links to blog to blog.hpi-schul-cloud.de

## [24.2.1] - 2020-08-13

## Fixed - 24.2.1

-   SC-6012 Etherpad authorization error due to unique name problem
-   SC-6125 fix broken link

## [24.0.3] - 2020-08-05

### Fixed - 24.0.3

-   SC-5948 Fix login for international cloud

## [24.0.2] - 2020-08-05

### Fixed - 24.0.2

SC-5954 Fix messenger settings in teams

## [24.0.1] - 2020-07-31

### Fixed - 24.0.1

SC-5917 Fix activation of LDAP system

## [24.0.0] - 2020-07-30

### Added - 24.0.0

-   SC-4151 hint for user when login failes
-   SC-4577 school specific privacy policy can be added by the school admin. If school specific privacy policy is exists
    it is shown to every school user by the registration, first login and in the footer of the page. If it was changed the
    privacy policy should be confirmed by every school user

### Fixed - 24.0.0

-   SC-4993 fixed video player issue in ckeditor
-   SC-5686 :teamId/edit can only be accessed if the user has the team permission "RENAME_TEAM"; :courseId/edit can only
    be accessed if the user has the permission "COURSE_EDIT

### Changed - 24.0.0

-   SC-5327 removed 'bereich' suffix from navigation items

### Removed - 23.6.0

## [23.5.7] - 2020-07-17

-   SC-5653 update mint-ec email addresses

## [23.5.3] - 2020-07-10

-   SC-5494 Changed link in navigation bar
-   SC-5529 update hpi school-cloud brand name

## [23.5.2] - 2020-07-09

-   SC-5494 Changed link in navigation bar
-   SC-5529 update hpi school-cloud brand name

## [23.4.4] - 2020-06-18

-   fix mocha tests on server

## [23.4.3] - 2020-06-17

-   SC-5048 Temporarily disables Portfolio for NBC by removal of link to portfolio in add-ons.

## [23.1.2] - 2020-06-02

### Changed

-   SC-4766 minor text changes for n21

## [23.1.0] - 2020-05-20

### Added

-   SC-4250, SC-4135, SC-4252, loading new landing page content and theme from ghost. About page partly loaded from ghost. Login form removed from front page and replaced by button in navbar. Demo-Login removed from front page.

### Fixed

### Changed

### Security

-   SC-4506 Secure User Route. Removed not used /users route from view team members.

### Removed

## [23.0.0] - 2020-05-19

### Changed in 23.0.0

-   SC-4392 add/edit link dialog in ckeditor could not be opened
-   SC-4075 Teams creation by students logic was changed. New environment enumeration variable `STUDENT_TEAM_CREATION`
    with possible values `disabled`, `enabled`, `opt-in`, `opt-out` was introduced. The feature value is set by instance deployment.
    In case of `disabled`, `enabled` it is valid for all schools of the instance and cannot be changed by the admin.
    In case of `opt-in` and `opt-out` the feature should be enabled/disabled by the school admin.

### Fixed

-   SC-4392 add/edit link dialog in ckeditor could not be opened

## [22.10.0] - 2020-05-11

### Security in 22.10.0

-   SC-3990 generation of first login passwords

### Added in 22.10.0

-   SC-3664 query toast-type and toast-message
-   SC-3892 Task sorting on the course side
-   SC-3757 the LDAP config page now contains a link to the docs
-   SC-438 on logout button click localStorge will be deleted
-   SC-3801 added generic filepicker url to ckeditor
-   SC-4260 added sentry sampling
-   SC-4064 allow to append files to submission feedback
-   SC-4064 allow for bulk download of ungraded homework files
-   SC-4064 allow for bulk upload of graded homework files

### Changed in 22.10.0

-   SC-3607 CSV import now suggests the new birthday field (sample file + image)
-   SC-3607 the student/teacher import page now displays a warning for large imports
-   updated airbnb linter from 13.1 to 14.1
-   SC-3801 updated CKEDITOR to 4.14
-   SC-3801 changes CKEDITOR theme to a more maintained one (n1theme)

### Fixed in 22.10.0

-   SC-3945 Courses are now again unarchiveable

## [22.9.12] - 2020-05-06

### Changed in 22.9.12

-   Moved the Cookie parameters into the configuration
-   Cookie property sameSite changed from strict to none as default

## [22.9.8] - 2020-04-23

### Added in 22.9.8

-   add support for API-Key

## [22.9.7] - 2020-04-21

### Added in 22.9.7

-   part of frontpage now loading content from sc blog.

## [22.9.2] - 2020-04-09

### Changed in 22.9.2

-   All team events load now.

## [22.9.1] - 2020-04-08

### Changed in 22.9.1

-   SC-3951: frontpage of n21 now loading content from n21 blog

## [22.9.0] - 2020-04-08

### Changed in 22.9.0

-   Security fixes, Update Handlebars from 4.5 to 4.7
-   SC-3749 remove cookie domain
-   use babel-eslint parser for eslint and updated liner rules for json
-   SC-3719 Shared files are now determined more more cleverly

## [22.8.0]

### Fixed in 22.8.0

-   SC-3732: edit button was not visible for course teachers except the author on the task detail page

## [22.7.2] - 2020-04-03

### Changed in 22.7.2

-   SC-3900 update tsc email on community page

## [22.7.1] - 2020-04-02

### Added in 22.7.1

-   This changelog has been added

### Changed in 22.7.1

-   SC-3884 update community page text
-   SC-3872: update dataprivacy text
-   SC-3868 changed NBC contact details from `terhaseborg@n-21.de` to `nbc-support@netz-21.de`
-   SC-3878 some styling and interaction improvements to homeworks and archived homeworks

### Fixed in 22.7.1

-   SC-3785: link to course after course creation corrected
-   SC-3732: edit button was not visible for course teachers except the author on the task detail page
-   SC-3807: link "Methodenguide" in nbc addons
-   provide more formats for PTSans font to be compatible with more browsers
