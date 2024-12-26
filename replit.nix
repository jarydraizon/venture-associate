
{ pkgs }: {
  deps = [
    pkgs.nodejs-20
    pkgs.nodePackages.typescript-language-server
    pkgs.psmisc
    pkgs.libxcrypt
  ];
}
