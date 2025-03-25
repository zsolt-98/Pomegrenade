export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Fredoka', sans-serif;
      background: #e1f4f4;
    }
    table, td {
      border-collapse: collapse;
      font-weight: 500;
    }
    .container-wrapper {
      width: 100%;
      max-width: 500px;
      margin: 70px auto;
    }
    .container {
      width: 100%;
      background-color: #ffd2ad;
      border: 2px solid #379999;
      border-radius: 32px; 
      overflow: hidden; 
    }
    .main-content {
      padding: 48px 30px 40px;
      color: #ff5c5c;
    }
    .button {
      display: inline-block;
      width: 100%;
      padding: 10px 0;
      background-color: transparent;
      color: #379999;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      text-decoration: none;
      border: 2px solid #379999;
      border-radius: 9999px;
    }
    .button:hover {
      background-color: #379999;
      color: #e1f4f4;
    }
    @media only screen and (max-width: 480px) {
      .container-wrapper {
        width: 80% !important;
      }
      .button {
        width: 50% !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#e1f4f4">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <div class="container-wrapper">
            <div class="container">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td class="main-content">
                      <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                              Verify your email
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                              Thank you for registering your account with us! To verify your email, use the verification code below.
                            </td>
                          </tr>
                         
                          <tr>
                            <td style="padding: 0 0 24px; text-align: center;">
                              <div class="button">{{otp}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                              This verification code is valid for 24 hours.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Fredoka', Arial, 'Helvetica Neue', Helvetica, sans-serif;
      background: #e1f4f4;
    }
    table, td {
      border-collapse: collapse;
      font-weight: 500;
    }
    .container-wrapper {
      width: 100%;
      max-width: 500px;
      margin: 70px auto;
    }
    .container {
      width: 100%;
      background-color: #ffd2ad;
      border: 2px solid #379999;
      border-radius: 32px; 
      overflow: hidden; 
    }
    .main-content {
      padding: 48px 30px 40px;
      color: #ff5c5c;
    }
    .button {
      display: inline-block;
      width: 100%;
      max-width: 200px;
      padding: 10px 0;
      background-color: transparent;
      color: #379999;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      text-decoration: none;
      border: 2px solid #379999;
      border-radius: 9999px;
    }
    .email-highlight {
      color: #379999;
      font-weight: bold;
    }
    @media only screen and (max-width: 480px) {
      .container-wrapper {
        width: 80% !important;
      }
      .button {
        width: 50% !important;
      }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {
      font-family: Arial, Helvetica, sans-serif !important;
    }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #e1f4f4; font-family: 'Fredoka', Arial, 'Helvetica Neue', Helvetica, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#e1f4f4" style="background-color: #e1f4f4;">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <div class="container-wrapper">
            <div class="container" style="background-color: #ffd2ad; border: 2px solid #379999; border-radius: 32px; overflow: hidden;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td class="main-content" style="padding: 48px 30px 40px; color: #ff5c5c; font-family: 'Fredoka', Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                      <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold; color: #ff5c5c;">
                              Forgot your password?
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%; color: #ff5c5c;">
                              We received a password reset request for your account: <span class="email-highlight" style="color: #379999; font-weight: bold;">{{email}}</span>.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700; color: #ff5c5c;">
                              Use the verification code below to reset the password.
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 24px; text-align: center;">
                              <div class="button" style="display: inline-block; width: 100%; max-width: 200px; padding: 10px 0; background-color: transparent; color: #379999; font-size: 14px; text-align: center; font-weight: bold; text-decoration: none; border: 2px solid #379999; border-radius: 9999px;">{{otp}}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%; color: #ff5c5c;">
                              The verification code is only valid for the next 15 minutes.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;
