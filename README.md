# React-Segment-Modal

This project implements a page with a button to save a segment, allowing users to specify the segment name and add schemas to it. It also provides the functionality to dynamically add new schemas to the segment.

## Features
- Clicking on the "Save Segment" button opens a popup
- The popup contains a text box to input the segment name
- Users can select schemas from a dropdown and add them to the segment
- The available schema options are:
    - First Name (first_name)
    - Last Name (last_name)
    - Gender (gender)
    - Age (age)
    - Account Name (account_name)
    - City (city)
    - State (state)
- Users can dynamically add new schemas to the segment using the "+ Add new schema" link
- Newly added schema dropdowns can be modified and contain options that are not already selected
- Upon adding a new schema dropdown, the "Add schema to segment" dropdown is reset with unselected options
- When the user clicks "Save the Segment," the data is sent to the server in a specified format


![Image1](https://github.com/Sreejag4/React-Segment-Modal/assets/105071763/1f5a4fde-cca6-41ef-9049-b581e69efaff)
![image](https://github.com/Sreejag4/React-Segment-Modal/assets/105071763/3227088c-1b56-4f1b-94d6-c77208fcc82b)
