# Angular 7 web app with ServiceNow backend

## What's this?
Angular 7 web application developed to replace Service Portal on ServiceNow. It offers several benefits when compared native Service Portal
1. Angular is widely used framework and offers responsive single page applications (SPA)
2. No need to wait for ServiceNow to update their instance to Latest Angular version or Bootstrap version 
2. No need to hack ServicePortal widgets and spend hours on fixing collisions between ServiceNow libraries and your custom CSS and JS libraries.
3. Use industry standard OAuth2 protocol for securing the web app 
4. Use ServiceNow as REST API backend


### Technologies Used
1. Angular 7.x
2. Bootstrap 4.x
3. ServiceNow Madrid
4. OAuth2.0
5. Others 

## Configure ServiceNow backend
1. Get ServiceNow [developer instance](https://developer.servicenow.com/app.do#!/dashboard?v=madrid) of you do not have one
2. Follow the instructions from [ServiceNow docs](https://docs.servicenow.com/bundle/madrid-platform-administration/page/administer/security/task/t_SettingUpOAuth.html) to activate the OAuth2.0 plugin
3. Once activated, search for `oauth` and select `Application Registries` to create new OAuth client
4. Select **Create an OAuth API endpoint for external clients** and fill the client details. See [this](https://docs.servicenow.com/bundle/madrid-platform-administration/page/administer/security/task/t_CreateEndpointforExternalClients.html#t_CreateEndpointforExternalClients) for more information
5. Make sure the user has REST API access and assigned `snc_platform_rest_api_access` role
6. Test the created OAuth client with Postman or curl. 
```
$ curl -d "grant_type=password&client_id=<Client Id>&client_secret=<Client secret>&username=<UserId>&password=<Password>"   -H "Content-Type: application/x-www-form-urlencoded" https://devxxxxx.service-now.com/oauth_token.do
```
7. If you are using Postman, select **No Auth** Authorization and body type as **x-www-form-urlencoded**. Enter following key value pairs in body
```
 grant_type=password
 client_id=<Client Id>
 client_secret=<Client secret>
 username=<Username>
 password=<Password>
```
8. Response from step 6 or 7 should be the following. Use **access_token** in subsequents steps to access data
```json
{
    "access_token": "z5Ewzj6KRSWXBnljlYRpn-R_5gw3JSQ8y1h71cuCIyVy546I7jwg5k9M2E0ctc2ssJC9S2ER6ZWGXs474Ext4Q",
    "refresh_token": "Hek_vW3Q3jA2qM5nurYFCEruWPI5EX6zriI8a92v4FafFOsD5el17fWkrz48ZLlw3kpjZSRJmiK9uTyjPL6rKg",
    "scope": "useraccount",
    "token_type": "Bearer",
    "expires_in": 1799
}
```
9. Go to ServiceNow instance and search for **Scripted Rest APIs** and select it. Click on **New** and enter **Name** and other details then submit it
10. Select created  **Scripted Rest API** and create new **Resource** under resources and enter following info
    **HTTP method**: GET 
    **Name**: <Name> 
    **Script**: 
    ```
    (function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) 
     {
    	var userSysId=gs.getUserID();
    	var gr=new GlideRecord('sys_user_has_role');
    	gr.addQuery('user',userSysId);
    	gr.query();
    	var roles=[];
    	while(gr.next())
    		{
    			roles.push({name:gr.role.name,sysID:gr.role,description:gr.role.description});
    		}
    
    	var body=[];
    	body.push({username:gs.getUserName(),displayName:gs.getUserDisplayName(),sysId:gs.getUserID(),roles:roles});
        response.setBody(body);
    
    })(request, response);
    ```
11. This scripted api will be used in Angular App to access user information and roles
    



## How to  Run Angular App?
1. Clone [this repository](https://github.com/pavankjadda/Angular7-WebApp-ServiceNow) into your local machine and open in WebStorm or VS Code
2. Open the file **src/app/app.constants.ts** and change details based on your OAuth client and Scripted REST API detail
```typescript
export const SERVER_API_URL = 'https://dev81909.service-now.com/';
export const USER_INFO_URL = 'api/x_19668_halo/user_info';

export const OAUTH2_CLIENT_ID= '3c76622bc581b30082098914f97ee08e';
export const OAUTH2_CLIENT_SECRET= 'password12345';
export const OAUTH2_ACCESS_TOKEN_URI = SERVER_API_URL + 'oauth_token.do';

export const INCIDENT_API_URL = 'api/now/table/x_19668_halo_incident';

```
3. Download the [Allow-Control-Allow-Origin extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)
 to prevent Allow-Control-Allow-Origin errors
4. 


