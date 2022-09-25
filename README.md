# HaudioFeel?

<p align="middle">
<img src="https://github.com/Kireshanth/haudioFeel/blob/main/src/images/main-screen.JPG" width="640" height="440">
</p>


## Table of Contents
**[What is HaudioFeel? (How-do-you-feel?)](#what-is-haudiofeel)**<br>
**[Check it out](#check-it-out)**<br>
**[How to use?](#how-to-use)**<br>
**[Nerd Stuff](#nerd-stuff)**<br>
**[Limitations](#Limitations)**<br>
**[Future Improvements](#future-improvements)**<br>


## What is HaudioFeel?
A free music player that fetches the top songs from curated spotify playlists based on your mood!

## Check it out
Deployed at [haudiofeel.tech](https://haudiofeel.tech/)

## How to use?
Getting started is super simple 🙏 Click on any of the emojis to play music fitting to that feeling and cycle between tracks.

<p align="middle">
<img src="https://github.com/Kireshanth/haudioFeel/blob/main/src/images/play-screen.JPG" width="667" height="440">
</p>

You can change the playlists/emojis used by forking this repo and changing the following parameters shown below in the Icons.js component. Refer here to find the [spotify playlist id.](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)

<img src="https://github.com/Kireshanth/haudioFeel/blob/main/src/images/updatePlaylists.JPG" width="1100" height="300">

## Nerd Stuff

<p align="middle">
<img src="https://github.com/Kireshanth/haudioFeel/blob/main/src/images/network-diagram.jpg" width="800" height="400">
</p>

HaudioFeel was built using react. The spotify and youtube video search APIs were used to fetch songs as described in the diagram above. If you want to fork this repo, you would require access credentials from both APIs.

Artwork by [Keebs.](https://www.instagram.com/lakeebs/)

## Limitations

Youtube data API has a quota limit of 10,000 daily units. With each search request costing 100 units, a user can cycle between 100 songs daily before the quota is reached.

## Future Improvements

- [ ] Allow users to add songs to their spotify or youtube playlists
- [ ] Improve UI, add dark and light modes


