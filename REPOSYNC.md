**The auto-syncing of this repo was deemed to be a bad idea after all, see conclusions at the bottom of the file.**

##### The flow of changes between this repo and the Screeps Server (when enabled to be synced) follows the rules below:

0. Screeps Server is configured to use this repo and `screeps.com/default` directory.

1. **GitHub Repo** -> **Screeps Server** sync is one-directional only and occurs on new commits (including  merges) to GitHub Repo. Although the sync is triggered by commit to any branch, the code to be used on the server is pulled from the `master` branch, from the directory indicated in the sync config.
    1. During that sync only files from directory indicated in the repo sync config will be copied to the server into your `default` "branch". No subdirectories. Remember to have that `default` "branch" selected as the running one on Screeps Server.


2. Editing code via **Screeps WebApp** changes files on the **Server**
    1. There is no sync back to the repo
    2. Webapp has no access to your local codebase, that is managed by Local Client, see below.


3. As long as **Local Screeps Client** is running (also upon launch), it performs a **two-directional** auto-sync between server and local codebases. Every change is copied to the other environment, overwriting any unsaved changes there.
    1. This includes copying changes pulled into the Screeps Server from GitHub Repo (point 1 above).
        1. If GitHub Repo `master` branch changes while you have changes locally, your local changes will be **overwritten** by the ones pulled from the repo to the Screeps Server and then to Screeps Client.
    3. If you happen to have made changes both to local codebase while the Local Screeps Client was NOT running, and you also made changes on the Screeps Server, then upon launching the Local Screeps Client the conflict will be detected and you will see a warning:

        *"Your remote scripts have been changed. Do you want to replace scripts on your local file system with the remote scripts? Your local changes will be LOST!"*

        As indicated, that sync will be one-directional from **Screeps Server** to **Local Screeps Client** codebase and it is the only one destructive for your local **saved** changes, but you are getting a warning, so you can avoid that loss.

So if you create a repo that will include the local codebase maintained by the Local Screeps Client, perhaps in:  `C:\Users\{UserName}\AppData\Local\Screeps\scripts\` (for Win10),
and you publish that repo to GitHub, then you connect that repo in Account Management, and indicate a directory `screeps.com/default`, then you will essentially be able to have a workflow as follows:

1. You can edit local codebase in the Local Screeps Client or your IDE of choice. No difference.
2. That code is tracked in your repo, so you can commit/push that at any time.
3. If the Local Screeps Client is running, you will get your code auto-synced to the Server. - this is preferred mode, as you can see the impact of your changes live.
4. Regardless whether your Local Screeps Client is running, your code will be always synced to the Server upon `git push` to `master` branch (or merging of a pull request, if you're doing that in this repo).
3. Committing and pushing code that is already synced up by the Local Screeps Client will not create a conflict, as Server will find no changes between what it already has from the Client and what it gets from the repo.
4. If you, let's say, were on the go, away from your repo, and wanted to correct something via the Screeps WebApp, the only thing you need to do to sync those changes back to your Local Codebase and the local repo is launch your Local Screeps Client.

#### Problems detected

1. When we push to GitHub repo `master` branch, while there are still unstaged changes in Local Codebase, Screeps Server pulls from GitHub repo, then Local Client pulls from the Screeps Server and your local changes are LOST
    1. Suggested workaround: do not push to `master` while working locally in the `default` "branch" that is synced to it.

2. Actually, when you push to any branch, server pulls the repo and uses files from master branch, which are then copied down to Local Client and will overwrite your changes if you're not on `master` branch in local repo.

3. Due to the above, it is now determined, that syncing the GitHub repo with Screeps Server might not be so useful for us after all, as it causes some problems, while only duplicating the syncing functionality that Local Client already posesses.
