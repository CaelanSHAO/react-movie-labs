# Assignment 1 - ReactJS app.

Name: [JIAYI SHAO]

## Overview.

[This repository contains a ReactJS-based Movies Fan application that utilizes The Movie Database (TMDB) API. Users can explore movies, add favorites or watchlist, filter by genres, and see details about movies and actors. It also includes pagination, sorting, responsive layouts, and React Query for better data handling.]

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]
 
+ Static endpoint calls on UpcomingPage and NowPlayingPage.
+ Dynamic endpoint calls on TrendingTodayPage and ActorDetailsPage
+ Show actor details and link to the movie they are in in ActorDetailsPage. Link to recommended movies in MovieDetailsPage.
+ react-query stores static endpoints and dynamic endpoints to provide real-time API data dynamic update
+ Implementation of new filtering options like ratingFilter.
+ New filtering options such as ratingFilter.
+ Customize the new theme see file theme.js
+ Use of new MUIs such as Box, Pagination, etc.
+ Implement responsive layout for movie list page
+ Support paging through movie list.
+ Supports filtering and sorting of movie list to improve user experience.
+ Support adding watchlist and removing watchlist for movies.
+ Enlargement of moviecard on hover with hover
+ 
+ 
+ 


## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

e.g.
+ Discover list of movies - discover/movie
+ Movie details - movie/:id
+ Movie genres - /genre/movie/list
+ Trending movies - /trending/all/day
+ Actor details - /person/:id
+ Trending movies - /movie/now_playing
+ Upcoming movies - /movie/upcoming
+ Recommendations -  /movie/:id/recommendations
+ Movie Cast List - /movie/:id/credits
+ Reviews - /movie/:id/reviews
+ Images - /movie/:id/images
+ Filter by Rating - /discover/movie


## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /blogs - displays all published blogs.
+ /blogs/:id - displays a particular blog.
+ /blogs/:id/comments - detail view of a particular blog and its comments.
+ / - showing a list of recommended movies
+ /movies/favorites -showing movies that have been added to the collection.
+ /movies/upcoming -  displays a list of upcoming movies.
+ /movies/trending/:timeWindow - displays daily or weekly trending movies based on a time window.
+ /movie/now_playing - showing movies currently playing in theaters.
+ /movies/watchlist - showing movies that the user has marked for later viewing.
+ /movies/:id - showing details about a specific movie.
+ /reviews/:id - showing the content of reviews for a specific movie.
+ /reviews/form- allows users to add a review for a specific movie.
+ /person/:personId- displays the details of a specific actor and the movies they are involved in.



[If relevant, state what aspects of your app are protected (i.e. require authentication) and what is public.]

## Independent learning (If relevant).

Itemize the technologies/techniques you researched independently and adopted in your project, 
i.e. aspects not covered in the lectures/labs. Include the source code filenames that illustrate these 
(we do not require code excerpts) and provide references to the online resources that helped you (articles/blogs).