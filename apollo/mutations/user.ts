import { gql } from 'graphql-tag'

export const loginProfileUpdate = gql`
mutation loginProfileUpdate ($input: LoginProfileUpdateInput) {
    loginProfileUpdate (input: $input) {
        record {
            id
            email
            username
            isEmailVerified
            emailSettings {
                email
                useBothEmails
                balance
                balanceLimit
                mediaSuccess
                mediaError
                mediaBuy
                liveCodecs
                cameraError
                liveAutokick
                liveNotRecorded
                news
            }
            account {
                balance
                balanceLine
                currency
                creditEnabled
                removeMediaAt
            }
            stat {
                playtimeMs
                timesSpaceMs
            }
            settings {
                phone
                about
                language {
                    id
                    title
                    code
                }
            }
            createdAt
        }
    }
}
`

export const loginProfileAddPhoneEmail = gql`
 mutation loginProfileAddPhoneEmail($input: LoginProfileAddPhoneEmailInput){
    loginProfileAddPhoneEmail(input: $input){
        record {
            id
            email
            username
            isEmailVerified
            emailSettings {
                email
                useBothEmails
                balance
                balanceLimit
                mediaSuccess
                mediaError
                mediaBuy
                liveCodecs
                cameraError
                liveAutokick
                liveNotRecorded
                news
            }
            account {
                balance
                balanceLine
                currency
                creditEnabled
                removeMediaAt
            }
            stat {
                playtimeMs
                timesSpaceMs
            }
            settings {
                phone
                about
                language {
                    id
                    title
                    code
                }
            }
            createdAt
        }
    }
}
`

export const loginProfilePasswordChange = gql`
  mutation loginProfilePasswordChange ($input: LoginProfileChangePasswordInput) {
    loginProfilePasswordChange (input: $input){
      response
    }
  }
`

export const loginProfileEmailChange = gql`
  mutation loginProfileEmailChange ($input: LoginProfileEmailChangeInput) {
    loginProfileEmailChange (input: $input) {
      response
    }
  }
`

export const loginProfileResendActivationMail = gql`
  mutation loginProfileResendActivationMail {
    loginProfileResendActivationMail {
      response
    }
  }
`

export const loginProfileSetNotification = gql`
mutation loginProfileSetNotification($input: LoginProfileSetNotificationInput) {
    loginProfileSetNotification(input: $input){
        email
        useBothEmails
        balance
        balanceLimit
        mediaSuccess
        mediaError
        mediaBuy
        liveCodecs
        cameraError
        liveAutokick:
        liveNotRecorded
        news
    }
}
`
