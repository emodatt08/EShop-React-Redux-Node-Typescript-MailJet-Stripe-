export default {
    port: 2227,
    dbUri: "mongodb://localhost:27017/node-ts-api",
    accessTokenPrivateKey: ``,
    accessTokenPublicKey: ``,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    saltWorkFactor: 10,
    uploadPath:'/uploads',
    validMimeTypes: ['image/jpeg', 'image/png', 'image/PNG', 'image/JPEG', 'image/JPG', 'image/jpg'],
    maxSize: '60000000',
    emailPath:"/src/views/emails",
    mailJetPublicKey:"f71810e584149ec831a04a21951e907b",
    mailJetPrivateKey: "ca506e57d19a567ad731d1bc6f786171",
    stripeKey:"pk_test_N6y5hXHpI9GDfOa2VgHx53fI",
    stripeSecret :"sk_test_V9DtWZSmPaYUhVWCbwfexZb2",
    publicKey:`
    -----BEGIN CERTIFICATE-----
    MIIBwTCCAWegAwIBAgIJAO4IJF747CRIMAoGCCqGSM49BAMCMB4xHDAaBgNVBAMM
    E2NuX2lzMW54a1JuV0dpeHBZYXIwHhcNMjAxMDExMTExNTUxWhcNMzAxMDA5MTEx
    NTUxWjAeMRwwGgYDVQQDDBNjbl9pczFueGtSbldHaXhwWWFyMFkwEwYHKoZIzj0C
    AQYIKoZIzj0DAQcDQgAE8xasfPn3UW7/HaUJqM8NyrdQzqL+5RUDmGzZl2eTPE/E
    9sArtL8BCcEaZgxd+XCplIhUR8I9dvaw1sb3qLeva6OBjTCBijAdBgNVHQ4EFgQU
    VLHHhcMoA+snAYRx6YKgCKzcMWQwTgYDVR0jBEcwRYAUVLHHhcMoA+snAYRx6YKg
    CKzcMWShIqQgMB4xHDAaBgNVBAMME2NuX2lzMW54a1JuV0dpeHBZYXKCCQDuCCRe
    +OwkSDAMBgNVHRMEBTADAQH/MAsGA1UdDwQEAwIBBjAKBggqhkjOPQQDAgNIADBF
    AiEAulUH8XfcHD2jgb0h/B0rOhsvjPq4tKFqasOwGAunuPwCICgGtWsiUd86OMPz
    UUEOdbcb1oAAaoyw3c58QmuGcPKo
    -----END CERTIFICATE-----
    `,
    privateKey:`
    -----BEGIN CERTIFICATE-----
    MIIBzjCCAXWgAwIBAgIQTT63jKHMRKulXF0MQn/4TzAKBggqhkjOPQQDAjAeMRww
    GgYDVQQDDBNjbl9pczFueGtSbldHaXhwWWFyMB4XDTIwMTAxMTExMzQ0MVoXDTIz
    MDExNDExMzQ0MVowEzERMA8GA1UEAwwIaGlsbC12cG4wWTATBgcqhkjOPQIBBggq
    hkjOPQMBBwNCAARYW63AOgUpg4HfE99fivnJ2ge+pqhv+h9/IDIc63rm1K8cr1Ou
    IY2XYbV2OS/m2Ejpz/CnjhnBu7wpIVMxgPiLo4GfMIGcMAkGA1UdEwQCMAAwHQYD
    VR0OBBYEFEDySggdyLFJ0LhC2VnsqC5Ubw/oME4GA1UdIwRHMEWAFFSxx4XDKAPr
    JwGEcemCoAis3DFkoSKkIDAeMRwwGgYDVQQDDBNjbl9pczFueGtSbldHaXhwWWFy
    ggkA7ggkXvjsJEgwEwYDVR0lBAwwCgYIKwYBBQUHAwIwCwYDVR0PBAQDAgeAMAoG
    CCqGSM49BAMCA0cAMEQCIDwXjxveAuyMt+1HUHrNcwONvSbtnjztIVmKLf5GehFu
    AiBbpJkolcDpetJCS1k/VofeaAtVk+TYo3xTSDSSEXWp9Q==
    -----END CERTIFICATE-----
    `
}