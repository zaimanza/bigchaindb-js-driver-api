

var API_URL = ""

const setApiUrl = async (url) => {
    try {
        API_URL = url
        return true
    } catch (error) {
        return false
    }
}
exports.setApiUrl = setApiUrl

const fetchLatestTransaction = async (assetId) => {
    try {

        const isExist = await axios.get(API_URL + '/api/v1/transactions?asset_id=' +
            assetId
            + '&last_tx=true'
        )

        if (isExist?.data?.length === 0) return

        var fetchedtransaction = isExist?.data[0]

        if (fetchedtransaction?.asset?.id) {
            const fetched_asset = await axios.get(API_URL'/api/v1/assets?search=' +
                '%22' + fetchedtransaction?.asset?.id + '%22'
            )
            if (fetched_asset?.data[0]?.data) {
                fetchedtransaction.asset = fetched_asset?.data[0]?.data
            }
        }

        return fetchedtransaction
    } catch (error) {
        return
    }
}
exports.fetchLatestTransaction = fetchLatestTransaction