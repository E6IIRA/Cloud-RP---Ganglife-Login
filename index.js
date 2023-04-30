class Login {
    constructor() {
        this.browser = null;
        mp.events.add("submitRegisterToServer", (username, password) => this.submitToServer(username, password))
        mp.events.add("playerReady", (player) => this.playerReady(player))
        mp.events.add("destroyLogin", () => this.destroyLogin())
    }

    submitToServer(username, password) {
        if (username === "" || password === "") return;

        mp.events.callRemote("client:submitRegister", username, password);
    }

    playerReady(player) {
        if (!this.browser) {
            this.browser = mp.browsers.new('package://cef/Login/index.html')
            setTimeout(() => {
                mp.gui.cursor.show(true, true);
            }, 50)
            mp.gui.chat.show(false);
        }
    }

    destroyLogin() {
        if (this.browser) {
            this.browser.destroy();
            mp.gui.cursor.show(false, false);
            mp.gui.chat.show(true);
            mp.events.call("Camera:SpawnPlayer");
        }
    }

}

const login = new Login();