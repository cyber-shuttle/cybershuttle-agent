const { CyberShuttleServicePromiseClient } = require('../../protos/appItems_grpc_web_pb')
const { AppsRequest, MyApps, App, AppRequest, Item, ListItems, ItemRequest, ItemStatus } = require('../../protos/appItems_pb')


const host = 'http://localhost:5001/'

export class CyberShuttleServiceGrpc {

    static async getApps(data) {

        let client = new CyberShuttleServicePromiseClient(host, null, null);

        let user = new AppsRequest();

        user.setUserid(data.userId);

        try {
            const res = await client.getApps(user, null);

            var userApps = [];

            for (var userApp of res.getAppsList()) {
                userApps.push({
                    name: userApp.getName(),
                    icon: userApp.getIcon(),
                    appId: userApp.getAppid(),
                    noOfItems: userApp.getNoofitems()
                })
            }

            return { "userApps": userApps, "noOfApps": res.getNoofapps() };

        } catch (err) {
            throw new Error(`Cannot get apps for this user now. ${err}`);
        }
    }

    static async getItems(data) {

        let client = new CyberShuttleServicePromiseClient(host, null, null);

        let appId = new AppRequest();

        appId.setAppid(data.appId);

        try {
            const res = await client.getItems(appId, null);

            var userItems = [];

            for (var userItem of res.getItemsList()) {
                userItems.push({
                    name: userItem.getName(),
                    description: userItem.getDescription(),
                    itemId: userItem.getItemid(),
                    itemStatus: userItem.getItemstatus().getItemstatus(),
                    isItemLaunched: userItem.getItemstatus().getIsitemlaunched()
                })
            }

            return { "userItems": userItems, "appId": appId };

        } catch (err) {
            throw new Error(`Cannot get items for this user now. ${err}`);
        }
    }

    static async launchItem(data) {

        let client = new CyberShuttleServicePromiseClient(host, null, null);

        let itemRequest = new ItemRequest();

        itemRequest.setItemid(data.itemId);
        itemRequest.setSessionpath(data.sessionPath);

        try {
            const res = await client.launchItem(itemRequest, null);

            return { "isItemLaunched": res.getIsitemlaunched(), "itemStatus": res.getItemstatus(), "itemId": data.itemId };

        } catch (err) {
            throw new Error(`Cannot launch the item now. ${err}`);
        }
    }

    static async stopItem(data) {

        let client = new CyberShuttleServicePromiseClient(host, null, null);

        let itemRequest = new ItemRequest();

        itemRequest.setItemid(data.itemId);
        itemRequest.setSessionpath(data.sessionPath);

        try {
            const res = await client.stopItem(itemRequest, null);

            return { "isItemLaunched": res.getIsitemlaunched(), "itemStatus": res.getItemstatus(), "itemId": data.itemId };

        } catch (err) {
            throw new Error(`Cannot launch the item now. ${err}`);
        }
    }
}