# https://robertoprevato.github.io/Validating-JWT-Bearer-tokens-from-Azure-AD-in-Python/
# https://login.microsoftonline.com/ccb6deed-bd29-4b38-8979-d72780f62d3b/.well-known/openid-configuration
public = {
    "keys": [
        {
            "kty": "RSA",
            "use": "sig",
            "kid": "aPctw_odvROoENg3VoOlIh2tiEs",
            "x5t": "aPctw_odvROoENg3VoOlIh2tiEs",
            "n": "p2DzxOZiWEHhtVavuwImryTRxW4kJ0mbA1lbXon550DUnKDZCNZaztno8HpOl6NSbVbW-QLDz5VOqCn-PDvSIRcw-2hrJPRnCNob4yGEuC7v9dPVpPDFRiUrOcwCbJak6xsK9PEsX8FQ_onFHO6YJkjsFG8S2nMhgRK-JdURUcuj9paywSBtW9ddeqjQPgCPbZJtk39ReouoBYNm9xiwhTN0InY9Rt9PKUh4cRetg3OeKQ2E8TOVh1nHeTT2HIIYnAgB7ESUA07wYBuvet4UGemC2SdfpTSWk2YqzjZONW8p01hJg9x8lcSeyaQVOxTP_SjQoP99la1V8lArF35qxQ",
            "e": "AQAB",
            "x5c": [
                "MIIDBTCCAe2gAwIBAgIQU10WcpDECatD1ywgv0TNJjANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE5MDgyNTAwMDAwMFoXDTI0MDgyNDAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKdg88TmYlhB4bVWr7sCJq8k0cVuJCdJmwNZW16J+edA1Jyg2QjWWs7Z6PB6TpejUm1W1vkCw8+VTqgp/jw70iEXMPtoayT0ZwjaG+MhhLgu7/XT1aTwxUYlKznMAmyWpOsbCvTxLF/BUP6JxRzumCZI7BRvEtpzIYESviXVEVHLo/aWssEgbVvXXXqo0D4Aj22SbZN/UXqLqAWDZvcYsIUzdCJ2PUbfTylIeHEXrYNznikNhPEzlYdZx3k09hyCGJwIAexElANO8GAbr3reFBnpgtknX6U0lpNmKs42TjVvKdNYSYPcfJXEnsmkFTsUz/0o0KD/fZWtVfJQKxd+asUCAwEAAaMhMB8wHQYDVR0OBBYEFPBE/OYhU7DwWnEa6luL8L+MZwbHMA0GCSqGSIb3DQEBCwUAA4IBAQAYyA81g/dfsm/AeUyDfzObRaEdKinKI5GUFUvJXDobED7f6NL+ECyULBEVm/ksZBrg6f0aPTDnSFVsZIfMogXc0KfJrII1lnXucbt1LCOmjdlf54J1R/mn9dkHyZ3pfoZtpqcXlKFnRCurn864XqRQFgBSG39xUjXXUR5vWSrp3mHlil+W9Z9RTImNmkXnSJDosYLEvCUYyqarV8rKj6rBfaBdqP3F5s4GwIdjsZ13YfkD4c+meX3W/9x74awB5ys+p78c7IjnO8mQB9kPvY9wEnGLDfLQEC+A0af81ybvevMraFfwZtsq/FYJEMnn6hKkTUeb1kPpVdJLVN4JqiUM"
            ],
        },
        {
            "kty": "RSA",
            "use": "sig",
            "kid": "BB8CeFVqyaGrGNuehJIiL4dfjzw",
            "x5t": "BB8CeFVqyaGrGNuehJIiL4dfjzw",
            "n": "nYf1jpn7cFdQK2VuZevofmjBjLXldOXe92k5ktSSTg5X0sywHWmGM2n7CCXbx4CCs01-7gFNWUd1H3Ho1OtKIhqmxiPPMTPiY6ZGHUHDm0nGK3RUQafTT9kQ2eJOOB4QViAMdjCOt9lDp0REEWLDU5BvYgbl_cou3H3aVRd4hntm9No-RSlzhB3rBBmZaDM-pYWhxGwkBMbJnNeKJdBStz1xWqbVvCzc_SUUFyo22_4AoNgpPkhFguzIKS55AL1HotQKxlUPttUiR5C4DeJ6EkogQCWT97ePkThVoJGzrjZqNv_P2QHJOXbEvaTQB5kZzz9FzLtJCfQsFwk1kan9Iw",
            "e": "AQAB",
            "x5c": [
                "MIIDBTCCAe2gAwIBAgIQbiJkXaenk61AKixVocnLRTANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE5MTAwNTAwMDAwMFoXDTI0MTAwNDAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ2H9Y6Z+3BXUCtlbmXr6H5owYy15XTl3vdpOZLUkk4OV9LMsB1phjNp+wgl28eAgrNNfu4BTVlHdR9x6NTrSiIapsYjzzEz4mOmRh1Bw5tJxit0VEGn00/ZENniTjgeEFYgDHYwjrfZQ6dERBFiw1OQb2IG5f3KLtx92lUXeIZ7ZvTaPkUpc4Qd6wQZmWgzPqWFocRsJATGyZzXiiXQUrc9cVqm1bws3P0lFBcqNtv+AKDYKT5IRYLsyCkueQC9R6LUCsZVD7bVIkeQuA3iehJKIEAlk/e3j5E4VaCRs642ajb/z9kByTl2xL2k0AeZGc8/Rcy7SQn0LBcJNZGp/SMCAwEAAaMhMB8wHQYDVR0OBBYEFOLhl3BDPLNVYDe38Dp9JbUmd4kKMA0GCSqGSIb3DQEBCwUAA4IBAQAN4XwyqYfVdMl0xEbBMa/OzSfIbuI4pQWWpl3isKRAyhXezAX1t/0532LsIcYkwubLifnjHHqo4x1jnVqkvkFjcPZ12kjs/q5d1L0LxlQST/Uqwm/9/AeTzRZXtUKNBWBOWy9gmw9DEH593sNYytGAEerbWhCR3agUxsnQSYTTwg4K9cSqLWzHX5Kcz0NLCGwLx015/Jc7HwPJnp7q5Bo0O0VfhomDiEctIFfzqE5x9T9ZTUSWUDn3J7DYzs2L1pDrOQaNs/YEkXsKDP1j4tOFyxic6OvjQ10Yugjo5jg1uWoxeU8pI0BxY6sj2GZt3Ynzev2bZqmj68y0I9Z+NTZo"
            ],
        },
        {
            "kty": "RSA",
            "use": "sig",
            "kid": "M6pX7RHoraLsprfJeRCjSxuURhc",
            "x5t": "M6pX7RHoraLsprfJeRCjSxuURhc",
            "n": "xHScZMPo8FifoDcrgncWQ7mGJtiKhrsho0-uFPXg-OdnRKYudTD7-Bq1MDjcqWRf3IfDVjFJixQS61M7wm9wALDj--lLuJJ9jDUAWTA3xWvQLbiBM-gqU0sj4mc2lWm6nPfqlyYeWtQcSC0sYkLlayNgX4noKDaXivhVOp7bwGXq77MRzeL4-9qrRYKjuzHfZL7kNBCsqO185P0NI2Jtmw-EsqYsrCaHsfNRGRrTvUHUq3hWa859kK_5uNd7TeY2ZEwKVD8ezCmSfR59ZzyxTtuPpkCSHS9OtUvS3mqTYit73qcvprjl3R8hpjXLb8oftfpWr3hFRdpxrwuoQEO4QQ",
            "e": "AQAB",
            "x5c": [
                "MIIC8TCCAdmgAwIBAgIQfEWlTVc1uINEc9RBi6qHMjANBgkqhkiG9w0BAQsFADAjMSEwHwYDVQQDExhsb2dpbi5taWNyb3NvZnRvbmxpbmUudXMwHhcNMTgxMDE0MDAwMDAwWhcNMjAxMDE0MDAwMDAwWjAjMSEwHwYDVQQDExhsb2dpbi5taWNyb3NvZnRvbmxpbmUudXMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDEdJxkw+jwWJ+gNyuCdxZDuYYm2IqGuyGjT64U9eD452dEpi51MPv4GrUwONypZF/ch8NWMUmLFBLrUzvCb3AAsOP76Uu4kn2MNQBZMDfFa9AtuIEz6CpTSyPiZzaVabqc9+qXJh5a1BxILSxiQuVrI2BfiegoNpeK+FU6ntvAZervsxHN4vj72qtFgqO7Md9kvuQ0EKyo7Xzk/Q0jYm2bD4SypiysJoex81EZGtO9QdSreFZrzn2Qr/m413tN5jZkTApUPx7MKZJ9Hn1nPLFO24+mQJIdL061S9LeapNiK3vepy+muOXdHyGmNctvyh+1+laveEVF2nGvC6hAQ7hBAgMBAAGjITAfMB0GA1UdDgQWBBQ5TKadw06O0cvXrQbXW0Nb3M3h/DANBgkqhkiG9w0BAQsFAAOCAQEAI48JaFtwOFcYS/3pfS5+7cINrafXAKTL+/+he4q+RMx4TCu/L1dl9zS5W1BeJNO2GUznfI+b5KndrxdlB6qJIDf6TRHh6EqfA18oJP5NOiKhU4pgkF2UMUw4kjxaZ5fQrSoD9omjfHAFNjradnHA7GOAoF4iotvXDWDBWx9K4XNZHWvD11Td66zTg5IaEQDIZ+f8WS6nn/98nAVMDtR9zW7Te5h9kGJGfe6WiHVaGRPpBvqC4iypGHjbRwANwofZvmp5wP08hY1CsnKY5tfP+E2k/iAQgKKa6QoxXToYvP7rsSkglak8N5g/+FJGnq4wP6cOzgZpjdPMwaVt5432GA=="
            ],
        },
    ]
}
