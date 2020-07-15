# ADET
A web app for wardrobe management.
### Point-of-View:
A person who owns a lot of clothes needs to manage their wardrobes more efficiently because they find it overwhelming to keep a mental picture of their entire collection of clothes.
### Target User:
A woman in her 20s that leads a dynamic lifestyle and is busy with her career, which finds it hard to find tje time and mental energy to manage her wardrobe.
### Main tasks supported and addressed in our app:
- Add new clothes to your virtual wardrobe.
- Check comments and feedback on your clothing item.
- Get rid of unnecessary clothes recommended by the system.

### Showcase:

Demo Video link: https://youtu.be/Pm_mLBgt4zM

Prototype link:  https://umidjonokhunov.github.io/Adet/main_page.html
                 Test user id & pw: **teamkaktus**
               
### Representative screenshots

<img src="https://i.imgur.com/3J3Enmk.png" width="150" />

<img src="https://i.imgur.com/uR8o414.png" width="150" />

<img src="https://i.imgur.com/dq4Qe9q.png" width="150" />

<img src="https://i.imgur.com/y7sF9y5.png" width="150" />

<img src="https://i.imgur.com/BzYFs48.png" width="150" />

### Important details:
- main_page - the home page of our website.
- items_page - page where you can see your clothes.
- item_page - page where you can access information about individual clothes. This page also has an option to share the link to specific clothes through which other people can access and comment on that clothes.
- suggestion on which clothes should be discarded will be provided in the item_page.
- comments_page - where you can leave comments for individual clothes items
- add_page - page for adding new clothes items into your virtual wardrobe.
- sign_up page - self-explanatory. 
- User cannot access any page except the signup_page if not signed in.
- All pages are responsive and have been designed primarily for mobile phone use.
- Corresponding JS files with implementations of functions for each page are inside the js folder, CSS files are inside the css folder.
- Cloud Firestore is used to store Items(i.e. wardrobe elemets/clothes) and their information.
- Their respective images are stored using Firabase storage.
- Firebase Real-time database is used for storing comments.
- We used Bootstrap for page styling.
- Semantic UI was used for styling several UI elements as well as icons.
